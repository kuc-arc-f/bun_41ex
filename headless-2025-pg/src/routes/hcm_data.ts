import express from 'express';
const router = express.Router();
import axios from 'axios';
import { PGlite } from '@electric-sql/pglite'

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
    let get_order = req.query.order;
    let order_sql = "ASC";

    console.log("content=" , content);
    console.log("get_order=" , get_order);
    if(get_order !== "asc"){
      order_sql = "DESC";
    }
    const sql = `SELECT id, content, data ,created_at, updated_at 
      FROM hcm_data
      WHERE content = '${content}' ORDER BY created_at ${order_sql};  
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
    const ret = await db.query(`
      SELECT * FROM hcm_data WHERE id='${id}';
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
    await db.exec(`
    INSERT INTO hcm_data (content, data) 
    VALUES ('${body.content}', '${body.data}')
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
    await db.exec(`
     DELETE FROM hcm_data where id = '${body.id}'; 
    `
    );
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

    await db.exec(`UPDATE hcm_data 
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
