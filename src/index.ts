import express from 'express';
import bodyParser from 'body-parser';
import { FileUpload } from './typing';
import path from 'path';
import fs from 'fs';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/upload', (req, res) => {
  console.log('/upload', req.body);
  const { fileContent, targetPath, forceOverride } = req.body as FileUpload;
  if (fs.existsSync(targetPath) && !forceOverride) {
    return res.status(400).end(`File with target path is exist, and forceOverride is set to false: ${targetPath}`);
  }
  fs.writeFileSync(path.resolve(targetPath), fileContent, 'utf-8');
  res.send('ok');
});

app.listen(33000, () => {
  console.log('listen on http://localhost:33000');
});
