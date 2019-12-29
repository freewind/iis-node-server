import express from 'express';
import bodyParser from 'body-parser';
import uploadRouter from './routers/upload';
import bigFileRouter from './routers/bigFile';
import readFileRouter from './routers/readFile';

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
})

app.get('/', (req, res) => {
  console.log('/')
  res.send('Hello');
});

app.use('/upload', uploadRouter);

app.use('/bigfile', bigFileRouter);

app.use('/readfile', readFileRouter)

app.listen(33000, () => {
  console.log('listen on http://localhost:33000');
});
