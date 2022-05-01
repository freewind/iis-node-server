import express from 'express';
import fs from "fs";

const readFileRouter = express.Router();

type Params = {
  filePath: string
}

readFileRouter.get<Params>('/', (req, res) => {
  const filePath = req.query.filePath?.toString();
  if (!filePath) {
    return res.status(400).end('No query string "filePath" found');
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).end(`Request file is not exist: ${filePath}`);
  }
  fs.createReadStream(filePath).pipe(res);
});

export default readFileRouter;
