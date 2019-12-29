import express from 'express';
import bodyParser from 'body-parser';
import uploadRouter from './routers/upload';

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/', (req, res) => {
  console.log('/')
  res.send('Hello');
});

app.use('/upload', uploadRouter);

app.listen(33000, () => {
  console.log('listen on http://localhost:33000');
});
