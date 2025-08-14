
import express from 'express';
import { renderToString } from 'react-dom/server';
import { ollama } from 'ollama-ai-provider';
import { generateText } from 'ai';

import { getPriceParam } from './tools/getPriceParam';

import { firstGetRandom } from './tools/firstGetRandom';
import { firstGetDate } from './tools/firstGetDate';
import { firstGetTime } from './tools/firstGetTime';
import { addTodo } from './tools/addTodo';
import { getTodoList } from './tools/getTodoList';

const app = express();
import 'dotenv/config'

import Top from './pages/App';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
console.log("env=", process.env.NODE_ENV)
//console.log(process.env);

const errorObj = {ret: "NG", messase: "Error"};
const MODEL_NAME = "qwen3:8b";

//app.use('/api/common', commonRouter);
// API
app.post('/api/chat', async (req: any, res: any) => {
  try {
    const body = req.body;
    console.log(body)
    let message = body.messages + " /no_think";

    const result = await generateText({
      model: ollama(MODEL_NAME),
      tools: {
        firstGetRandom, firstGetDate, firstGetTime,
        addTodo, getTodoList,
      },
      maxSteps: 5,
      messages: [{ role: "user", content: message }],
    });
    console.log("artifact:");
    console.log(result.text);

    res.send({ret: 200, text: result.text});
  } catch (error) {
    res.sendStatus(500);
  }
});

// SPA
app.get('/*', (req: any, res: any) => {
  try {
    res.send(renderToString(Top()));
  } catch (error) {
    res.sendStatus(500);
  }
});

//start
const PORT = 3000;
app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
console.log('start');
