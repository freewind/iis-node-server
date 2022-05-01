import path from 'path';
import shelljs from 'shelljs';
import asyncPool from 'tiny-async-pool';

function fixPath(path: string): string {
  return path.replace(/\\/g, '\\\\')
}

// Download 5 files in parallel to reach max speed, until all files downloaded
export default async function downloadFilesInPool(unDownloadedFiles: string[], baseApi: string, localCacheDir: string): Promise<void> {
  const commands = unDownloadedFiles.map(unDownloadedFile => {
    return `wget ${baseApi}/readfile?filePath=${fixPath(unDownloadedFile)} -O ${localCacheDir}/${path.basename(unDownloadedFile)}`;
  });

  // the 'asyncPool' will reject immediately if any task is reject, which will cause all un-executed tasks ignored,
  // we should not reject in tasks
  await asyncPool(5, commands, async (command) => {
    return new Promise((resolve, reject) => {
      shelljs.exec(command, (code, stdout, stderr) => {
        if (stderr) {
          // just print, won't reject
          console.log(stderr);
        }
        // always resolve
        resolve(undefined);
      });
    })
  })
};

