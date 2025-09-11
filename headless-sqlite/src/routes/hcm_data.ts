import express from 'express';
const router = express.Router();
import hcmUtil from "../lib/hcmUtil";
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';

/**
*
* @param
*
* @return
*/
router.get('/list', async function(req: any, res: any) {
  const db = drizzle(process.env.DB_FILE_NAME!);
  try {
    //console.log(req.query);
    const content = req.query.content;
    if(!content){
      console.log("error, no content");
      return res.json({ret:400 , data:{}});
    }    
    let get_order = req.query.order;
    let order_sql = "ASC";

    console.log("content=" , content);
    console.log("get_order=" , get_order);
    if(get_order !== "asc"){
      order_sql = "DESC";
    }
    const sql = `SELECT id, data ,created_at, updated_at 
      FROM ${content}
      ORDER BY created_at ${order_sql};  
    `;
    const resp = await db.run(sql);
    //console.log(resp)
    return res.json({ret:200 , data: resp.rows });
  } catch (e) {
    console.log(e)
    res.sendStatus(500);
  }
});

/**
*
* @param
*
* @return
*/
router.get('/getone', async function(req: any, res: any) {
  const db = drizzle(process.env.DB_FILE_NAME!);
  try {
    //console.log(req.query);
    const content = req.query.content;
    const id = req.query.id;
    if(!content){
      console.log("error, no content");
      return res.json({ret:400 , data:{}});
    }
    if(!id){
      console.log("error, no id");
      return res.json({ret:400 , data:{}});
    }    

    console.log("content=" , content);

    const sql = `SELECT id, data ,created_at, updated_at 
      FROM ${content}
      WHERE id = ${id};  
    `;
    const resp = await db.run(sql);
    //console.log(resp)
    return res.json({ret:200 , data: resp.rows });
  } catch (e) {
    console.log(e)
    res.sendStatus(500);
  }
});

router.post('/create', async function(req: any, res: any) {
  const db = drizzle(process.env.DB_FILE_NAME!);
  try {
    const body = req.body;
    console.log(body);
    if(!body.content){
      console.log("error, no content");
      return res.json({ret:400 , data:{}});
    }
    const tablename = body.content.trim();
    const resTabble = await hcmUtil.isTableExists(db, tablename);
    console.log("resTabble=", resTabble);

    if(resTabble === false){
      const resCreate = await hcmUtil.createTable(db, tablename);
      console.log("resCreate=", resCreate);
    }
/*
    const resp = await db.run(`
    SELECT * FROM hcm_data 
    `);
    console.log(resp.rows);
*/
    await db.run(`
    INSERT INTO ${tablename} (data) 
    VALUES ('${body.data}')
    `);
    return res.json({ret:200 , data:{}});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


router.post('/delete', async function(req: any, res: any) {
  const db = drizzle(process.env.DB_FILE_NAME!);
  try {
    const body = req.body;
    console.log(body);
    if(!body.content){
      console.log("error, no content");
      return res.json({ret:400 , data:{}});
    }
    const tablename = body.content.trim();
    const sql = `
     DELETE FROM ${tablename} where id = ${body.id}; 
    `;
    console.log(sql);

    const resp = await db.run(sql);
    console.log(resp.rows);
    return res.json({ret:200 , data:{}});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


router.post('/update', async function(req: any, res: any) {
  const db = drizzle(process.env.DB_FILE_NAME!);
  try {
    const body = req.body;
    console.log(body);
    if(!body.content){
      console.log("error, no content");
      return res.json({ret:400 , data:{}});
    }
    const tablename = body.content.trim();
    const sql = `UPDATE ${tablename}
    SET data = '${body.data}'
    WHERE id = '${body.id}';
    `;
    console.log(sql);
    const resp = await db.run(sql);
    console.log(resp.rows);
    return res.json({ret:200 , data:{}});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;