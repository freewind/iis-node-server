import fs from 'fs';
import path from 'path';
import {FileInfo} from '../../server/routers/bigFile/getFileInfo';
import {md5OfFile} from '../../utils/md5';
import combinedFileName from './combinedFileName';

export default function findUnDownloadedFiles(localCacheDir: string, fileInfo: FileInfo): string[] {
  console.log('> findUnDownloadedFiles', {localCacheDir, fileInfo});

  const existingFileNames = fs.readdirSync(localCacheDir)
  const validFileNames = existingFileNames.filter(filename => {
    if (filename === combinedFileName) {
      return true;
    }

    const remoteMd5 = filename.split('.')[1]
    const file = path.resolve(localCacheDir, filename);
    console.log("### file", file);
    const localMd5 = md5OfFile(file)
    console.log(filename, {localMd5, remoteMd5})
    return localMd5 === remoteMd5;
  })
  console.log('validFiles', validFileNames);

  const invalidFileNames = existingFileNames.filter(it => !validFileNames.includes(it));
  console.log('invalidFiles', invalidFileNames);
  for (const invalidFile of invalidFileNames) {
    console.log('delete invalid file: ', invalidFile);
    fs.unlinkSync(invalidFile)
  }

  const unDownloadedFiles = (fileInfo.smallFiles || []).filter(filePath => {
    const filename = path.basename(filePath);
    return !validFileNames.includes(filename);
  })

  return unDownloadedFiles;
};
