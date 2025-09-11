import express from 'express';
const router = express.Router();
//import { PGlite } from '@electric-sql/pglite'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';

router.get('/content_list', async function(req: any, res: any) {
  const db = drizzle(process.env.DB_FILE_NAME!);
  try {

    const sql = `SELECT name 
    FROM sqlite_master 
    WHERE type='table'
    ORDER BY name; 
    `;
    const resp = await db.run(sql);
    console.log(resp)
    if(resp.rows.length === 0){
      return res.json({ret:200 , data: [] });
    };
    const out = [];
    resp.rows.forEach((element) => {
      if(
        !(element.name === "__drizzle_migrations" || 
          element.name === "sqlite_sequence"
        )
      ){
        out.push(element);
      }
    });

    return res.json({ret:200 , data: out });
  } catch (e) {
    console.log(e)
    res.sendStatus(500);
  }
});


router.get('/data_list', async function(req: any, res: any) {
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

export default router;
