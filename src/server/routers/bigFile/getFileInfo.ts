import fs from 'fs';
import buildDirPath from './buildDirPath';
import {findEntireFileMd5, isEntireFileMd5File} from './entireFileMd5';

export type FileInfo = {
  requestFilePath: string;
  smallFilesDirPath: string;
  requestFileExists: boolean,
  smallFilesDirExists?: boolean,
  smallFiles?: string[]
  bigFileMd5?: string,
}

export default function getFileInfo(filePath: string): FileInfo {
  const dirPath = buildDirPath(filePath);

  if (!fs.existsSync(filePath)) {
    return {
      requestFilePath: filePath,
      smallFilesDirPath: dirPath,
      requestFileExists: false
    }
  }


  if (!fs.existsSync(dirPath)) {
    return {
      requestFilePath: filePath,
      smallFilesDirPath: dirPath,
      requestFileExists: true,
      smallFilesDirExists: false,
    };
  }

  const smallFileNames = fs.readdirSync(dirPath);

  return {
    requestFilePath: filePath,
    smallFilesDirPath: dirPath,
    requestFileExists: true,
    smallFilesDirExists: true,
    bigFileMd5: findEntireFileMd5(smallFileNames),
    smallFiles: smallFileNames.filter(it => !isEntireFileMd5File(it)).map(filename => `${dirPath}/${filename}`)
  };
};
