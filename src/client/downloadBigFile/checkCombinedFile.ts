import {FileInfo} from '../../server/routers/bigFile/getFileInfo';
import path from 'path';
import fs from 'fs';
import combinedFileName from './combinedFileName';
import {md5OfFile} from '../../utils/md5';

export default function checkCombinedFile(localCacheDir: string, fileInfo: FileInfo): boolean {
  const combinedFilePath = path.resolve(localCacheDir, combinedFileName)
  console.log('combinedFilePath', combinedFilePath);

  if (fs.existsSync(combinedFilePath)) {
    console.log('local combined file is exist')
    const md5 = md5OfFile(combinedFilePath)
    if (md5 === fileInfo.bigFileMd5) {
      console.log('local combined file is valid')
      return true;
    } else {
      throw new Error(`Found combined file, but it is invalid. Remote md5(${fileInfo.bigFileMd5}), local md5(${md5})`)
    }
  } else {
    console.log('local combined file is not exist')
    return false;
  }
};
