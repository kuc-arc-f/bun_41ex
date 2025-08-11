
import express from 'express';
import { renderToString } from 'react-dom/server';
const app = express();
import 'dotenv/config'

import Top from './pages/App';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
console.log("env=", process.env.NODE_ENV)
//console.log(process.env)

const errorObj = {ret: "NG", messase: "Error"};
//app.use('/api/common', commonRouter);

// API
app.get('/get_sheet_list', async(req, res) => {
  try{
    console.log("get.path=", req.path);
    const auth_api_key = process.env.VITE_GOOGLE_AUTH_API_KEY;
    const sheetId = process.env.VITE_SPREADSHEET_ID_1;
    console.log("get.sheet_id=", sheetId);
    let url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`;
    url += "/values/シート1!A1:C100?key=" + auth_api_key
    //console.log("url=", url);
    const response = await fetch(url); 
    if(response.ok === false){
      throw new Error("Error, response <> OK:");
    }
    const json = await response.json();
    //console.log(json);

    return res.json({ret: 200, data: json});
  }catch(e){
    console.error(e);
    return res.json({ret: 500, text: "Internal Server Error"});
  }
});

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
