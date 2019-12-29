import fs from "fs";
import path from 'path';
import combinedFileName from './combinedFileName';
import shelljs from 'shelljs';

function isNumeric(num: any): boolean {
  return !isNaN(num)
}

export default function combineLocalCacheFiles(localCacheDir: string) {
  console.log('> combineLocalCacheFiles', {localCacheDir})

  const existingFileNames = fs.readdirSync(localCacheDir).filter(fileName => {
    const [num, md5] = fileName.split('.')
    return num && md5 && isNumeric(num);
  })
  existingFileNames.sort((a, b) => {
    const [a1] = a.split('.')
    const [b1] = b.split('.')
    return parseInt(a1) - parseInt(b1);
  })
  console.log('sorted existingFileNames', existingFileNames);

  const targetFile = path.resolve(localCacheDir, combinedFileName);
  const command = `cat ${existingFileNames.map(fileName => path.resolve(localCacheDir, fileName)).join(' ')} > ${targetFile}`;
  console.log('command', command);

  shelljs.exec(command)
};
