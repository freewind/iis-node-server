import express from 'express';
import fs from "fs";
import getFileInfo from './getFileInfo';
import generateSmallFiles from './generateSmallFiles';
import rmDir from 'rimraf';

type Params = {
  filePath: string;
}

const bigFileRouter = express.Router();

bigFileRouter.get('/', (req, res) => {
  res.send('bigFileRouter');
});

bigFileRouter.post<Params>('/prepare', (req, res) => {
  const {filePath} = req.body;
  console.log('filePath', filePath);

  const info = getFileInfo(filePath);
  console.log('fileInfo', info);

  if (!info.requestFileExists || info.smallFilesDirExists) {
    return res.json(info);
  }

  generateSmallFiles(filePath, () => {
    res.json(getFileInfo(filePath));
  });
});

bigFileRouter.get<Params>('/info', (req, res) => {
  const {filePath} = req.body;
  res.json(getFileInfo(filePath));
});

bigFileRouter.post<Params>('/clear', (req, res) => {
  const {filePath} = req.body;
  const info = getFileInfo(filePath);
  rmDir.sync(info.smallFilesDirPath);
  res.send('ok');
});

export default bigFileRouter;
