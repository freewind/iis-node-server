import express from 'express';
import bodyParser from 'body-parser';
import {FileUpload} from './typing';
import path from 'path';
import fs from 'fs';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/upload', (req, res) => {
  const fileUpload = req.body as FileUpload
  console.log('/upload', fileUpload);

  const targetPath = path.resolve(fileUpload.targetPath);
  const targetPathExists = fs.existsSync(targetPath);
  console.log('targetPath exists?', targetPath, targetPathExists);

  const {forceOverride, fileContent} = fileUpload;
  if (!targetPathExists || forceOverride) {
    fs.writeFileSync(path.resolve(targetPath), fileContent, 'utf-8');
    res.send('ok');
  } else {
    res.status(400).end(`File with target path is exist, and forceOverride is set to false: ${targetPath}`);
  }
});

app.listen(33000, () => {
  console.log('listen on http://localhost:33000');
});
