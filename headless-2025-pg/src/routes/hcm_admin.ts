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
      SELECT distinct content FROM hcm_data;
    `)
    console.log(ret.rows)
    db.close();
    return res.json({ret:200 , data:ret.rows });
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
    const ret = await db.query(`
      SELECT id, content, data ,created_at, updated_at 
      FROM hcm_data
      WHERE content = '${content}'      
    `)    
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
