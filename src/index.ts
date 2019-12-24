import express from 'express';
import bodyParser from 'body-parser';
import {FileUpload} from './typing';
import path from 'path';
import fs from 'fs';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  console.log('/')
  res.send('Hello');
});

app.post('/upload', (req, res) => {
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

app.listen(33000, () => {
  console.log('listen on http://localhost:33000');
});
