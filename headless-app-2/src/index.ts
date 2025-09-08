
import express from 'express';
import { renderToString } from 'react-dom/server';

const app = express();
import 'dotenv/config'

import Top from './pages/App';
import todoRouter from './routes/todos';
import todo13Router from './routes/todo13';
import sortRouter from './routes/sort';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
console.log("env=", process.env.NODE_ENV)
console.log("EXTERNAL_API_URL=", process.env.EXTERNAL_API_URL)
//console.log(process.env);

const errorObj = {ret: "NG", messase: "Error"};

// API
app.use('/api/todos', todoRouter);
app.use('/api/todo13', todo13Router);
app.use('/api/sort', sortRouter);

// SPA
app.get('/*', (req: any, res: any) => {
  try {
    res.send(renderToString(Top()));
  } catch (error) {
    res.sendStatus(500);
  }
});

//start
const PORT = 4000;
app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
console.log('start');
