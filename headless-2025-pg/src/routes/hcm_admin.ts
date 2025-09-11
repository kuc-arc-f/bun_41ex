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
router.get('/content_list', async function(req: any, res: any) {
  const db = new PGlite(process.env.DATA_DIR);
  try {
    const ret = await db.query(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public';      
    `)
    /*
    const ret = await db.query(`
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public';      
    `);
    */

    console.log(ret.rows)
    db.close();
    return res.json({ret:200 , data: ret.rows });
  } catch (error) {
    db.close();
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/data_list', async function(req: any, res: any) {
  const db = new PGlite(process.env.DATA_DIR);
  try {
    const content = req.query.content;    
    console.log("content=" , content)
    if(!content){
      console.log("error, no content");
      return res.json({ret:400 , data:{}});
    }       
    const sql = `SELECT id, data ,created_at, updated_at 
      FROM ${content}
      ORDER BY created_at ASC;  
    `;

    const ret = await db.query(sql);
    console.log(ret.rows)
    db.close();
    return res.json({ret:200 , data:ret.rows });
  } catch (error) {
    db.close();
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
