
import express from 'express';
import cookieParser from "cookie-parser";
import { renderToString } from 'react-dom/server';
import { PGlite } from '@electric-sql/pglite'
import 'dotenv/config'

const app = express();

import Top from './pages/App';
import hcmdataRouter from './routes/hcm_data';
import hcmadminRouter from './routes/hcm_admin';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
console.log("env=", process.env.NODE_ENV)
console.log("DATA_DIR=", process.env.DATA_DIR)
//console.log(process.env);

const errorObj = {ret: "NG", messase: "Error"};
const COOKIE_NAME= "userid"

//Middleware-API
app.use('/*', function(req, res, next) {
  const apikey = process.env.API_KEY;
  //console.log("API_KEY=", process.env.API_KEY)
  const path = req.baseUrl;
  console.log("path=", path)

  if(path.indexOf("/api/") === 0){
    const authHeader = req.headers["authorization"]
    if(!(path === "/api/user/login" 
      || path === "/api/admin/content_list"
      || path === "/api/admin/data_list")
    ) {
      if (apikey !== authHeader) {
        console.log("NG, auth");
        return res.sendStatus(400);
      }
    }
  }else{
    if (path !== "/login") {
      //console.log(req.cookies);
      if (!req.cookies[ COOKIE_NAME ]) {
        return res.redirect('/login');
      }
    }
  }
  next();
});

// API
app.use('/api/data', hcmdataRouter);
app.use('/api/admin', hcmadminRouter);

app.post('/api/user/login', async function(req: any, res: any) {
  const retObj = {ret: 500, data: null};
  try {
    const body = req.body
    console.log(body);
    const { username, password } = body;
    if (username === process.env.USER_NAME && password === process.env.PASSWORD) {
      //生存期間( msec ) Nday
      res.cookie(COOKIE_NAME , "1", {
        maxAge: 365 * 24 * 60 *  60 * 1000,
        httpOnly: false
      })
      return res.json(body);
    }
    return res.sendStatus(400);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/api/content/list', async function(req: any, res: any) {
  try {
    //console.log("authHeader=", authHeader)
    const db = new PGlite(process.env.DATA_DIR)
    const result = await db.query(`
    SELECT distinct content FROM hcm_data;
    `)
    //console.log(result.rows)
    res.send({ret: 200, data: result.rows});
  } catch (error) {
    console.error(error);
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
