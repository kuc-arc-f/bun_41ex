import express from 'express';
const router = express.Router();
import axios from 'axios';
import { PGlite } from '@electric-sql/pglite'
import hcmUtil from "../lib/hcmUtil";

/**
*
* @param
*
* @return
*/
router.get('/list', async function(req: any, res: any) {
  const db = new PGlite(process.env.DATA_DIR);
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
    console.log("dbg=" , sql)

    const ret = await db.query(sql)
    console.log(ret.rows)
    db.close();
    return res.json({ret:200 , data:ret.rows });
  } catch (error) {
    db.close();
    console.error(error);
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
  const db = new PGlite(process.env.DATA_DIR);
  try {
    const id = req.query.id;
    console.log("id=" , id)
    const content = req.query.content;
    if(!content){
      console.log("error, no content");
      return res.json({ret:400 , data:{}});
    }
    console.log("content=" , content)
    const tablename = content;

    const ret = await db.query(`
      SELECT * FROM ${tablename} WHERE id='${id}';
    `)
    let out = [];
    if(ret.rows[0]){
      out = ret.rows[0];
    }
    console.log(ret.rows)
    db.close();
    return res.json({ret:200 , data: out });
  } catch (error) {
    db.close();
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/create', async function(req: any, res: any) {
  const db = new PGlite(process.env.DATA_DIR);
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

    await db.exec(`
    INSERT INTO ${tablename} (data) 
    VALUES ('${body.data}')
    `);
    db.close();
    return res.json({ret:200 , data:{}});
  } catch (error) {
    db.close();
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/delete', async function(req: any, res: any) {
  const db = new PGlite(process.env.DATA_DIR);
  try {
    const body = req.body;
    console.log(body);
    if(!body.content){
      console.log("error, no content");
      return res.json({ret:400 , data:{}});
    }    
    const tablename = body.content.trim();
    const sql = `
     DELETE FROM ${tablename} where id = '${body.id}'; 
    `;
    console.log(sql);
    await db.exec(sql);
    db.close();
    res.send({ret: 200, text: ""});
  } catch (error) {
    db.close();
    console.error(error);
    res.sendStatus(500);
  }
});


router.post('/update', async function(req: any, res: any) {
  const db = new PGlite(process.env.DATA_DIR);
  try {
    const body = req.body;
    console.log(body);
    if(!body.content){
      console.log("error, no content");
      return res.json({ret:400 , data:{}});
    }
    const tablename = body.content.trim();
    await db.exec(`UPDATE ${tablename} 
    SET data = '${body.data}'
    WHERE id = '${body.id}';
    `);
    db.close();
    return res.json({ret:200 , data:{}});
  } catch (error) {
    db.close();
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
