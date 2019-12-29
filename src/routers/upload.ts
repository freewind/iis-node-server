import express from 'express';
import {FileUpload} from '../typing';
import fs from "fs";

const uploadRouter = express.Router();

uploadRouter.get('/', (req, res) => {
  res.send('uploadRouter');
});

uploadRouter.post('/', (req, res) => {
  const {fileName, forceOverride = false, fileContent = '', targetPath} = req.body as FileUpload
  console.log('/upload', {fileName, fileContentLength: fileContent.length, targetPath});

  const targetPathExists = fs.existsSync(targetPath);
  console.log('targetPath exists?', targetPath, targetPathExists);

  if (!targetPathExists || forceOverride) {
    console.log('will write to file: ', targetPath)
    fs.writeFileSync(targetPath, fileContent, 'utf-8');
    res.send('ok');
  } else {
    console.log('will not override the target file:', targetPath)
    res.status(400).end(`File with target path is exist, and forceOverride is set to false: ${targetPath}`);
  }
});

export default uploadRouter;
