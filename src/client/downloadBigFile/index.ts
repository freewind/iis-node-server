import axios from 'axios';
import cliArgs from './cliArgs';
import {FileInfo} from '../../server/routers/bigFile/getFileInfo';
import findUnDownloadedFiles from './findUndownloadedFiles';
import checkCombinedFile from './checkCombinedFile';
import combineLocalCacheFiles from './combineLocalCacheFiles';
import downloadFilesInPool from './downloadFilesInPool';

const {filePath, host, localCacheDir} = cliArgs;
if (!filePath) {
  throw new Error('filePath not provided')
}
if (!host) {
  throw new Error('host not provided')
}
if (!localCacheDir) {
  throw new Error('localTargetDirPath not provided')
}

async function main() {
  const apiBase = `${host}/bigfile`;
  console.log('urlBase', apiBase);

  const response = await axios.post(`${apiBase}/prepare`, {
    filePath
  })
  const fileInfo = response.data as FileInfo;

  if (!fileInfo.requestFileExists) {
    throw new Error(`Request file is not exist: ${fileInfo.requestFilePath}`)
  }

  if (checkCombinedFile(localCacheDir, fileInfo)) {
    return;
  }

  const unDownloadedFiles = findUnDownloadedFiles(localCacheDir, fileInfo);
  console.log('unDownloadedFiles', unDownloadedFiles);

  if (unDownloadedFiles.length > 0) {
    await downloadFilesInPool(unDownloadedFiles, host, localCacheDir);
  } else {
    combineLocalCacheFiles(localCacheDir);
  }

  checkCombinedFile(localCacheDir, fileInfo);
}

main()
