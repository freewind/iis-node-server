import fs from 'fs';
import SmallFileStream from './SmallFile';
import buildDirPath from './buildDirPath';
import crypto from "crypto";
import path from 'path';
import {buildEntireFileMd5FileName} from './entireFileMd5';

const smallFileSize = 100 * 1024 * 1024; // 100M

function writeEntireMd5File(dirPath: string, entireFileMd5: string): void {
  console.log("> writeEntireMd5File", {dirPath, entireFileMd5});
  const md5FilePath = path.resolve(dirPath, buildEntireFileMd5FileName(entireFileMd5));
  fs.writeFileSync(md5FilePath, '', 'utf-8');
}

export default function generateSmallFiles(filePath: string, callback: () => void) {
  console.log('> generateSmallFiles', filePath);

  const dirPath = buildDirPath(filePath);
  console.log('dirPath', dirPath);

  let smallFileNumber = 0;
  let smallFileStream: SmallFileStream | null = null;

  const readStream = fs.createReadStream(filePath);
  const entireFileMd5Stream = crypto.createHash('md5').setEncoding('hex');

  readStream.on('data', (data: Buffer) => {
    if (smallFileStream !== null && smallFileStream.bytesWritten > smallFileSize) {
      smallFileStream.end();
      smallFileStream = null;
    }

    if (smallFileStream === null) {
      smallFileStream = new SmallFileStream(dirPath, smallFileNumber)
      smallFileNumber += 1;
      console.log('smallFileNumber', smallFileNumber);
    }

    smallFileStream.write(data);
    entireFileMd5Stream.write(data);
  });

  readStream.on('end', () => {
    console.log("read end", {smallFileNumber});

    if (smallFileStream !== null) {
      smallFileStream.end();
    }
    entireFileMd5Stream.end();

    const entireFileMd5 = entireFileMd5Stream.read();
    writeEntireMd5File(dirPath, entireFileMd5);

    callback();
  })

};
