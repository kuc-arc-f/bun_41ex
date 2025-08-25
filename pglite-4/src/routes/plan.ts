import express from 'express';
import { PGlite } from '@electric-sql/pglite'
import { eq } from "drizzle-orm";
import { drizzle } from 'drizzle-orm/pglite';
import { plan } from "../schema";

const router = express.Router();
const DATA_DIR = process.env.DATA_DIR;

router.post('/create', async function(req: any, res: any) {
  const db = drizzle(DATA_DIR);
  try {
    const body = req.body;
    //console.log(body);
    const { user_id, content, p_date } = req.body;
    const new_p_date = new Date(p_date);
    const target = { 
      user_id, content, p_date: new_p_date 
    }
    console.log(target);
    await db.insert(plan).values(target);

    return res.json({ret:200 , data:{}});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/list_range', async function(req: any, res: any) {
  const db = new PGlite(process.env.DATA_DIR);
  try {
    const body = req.body;
    console.log(body);
    const ret = await db.query(`
      SELECT * from plan
      WHERE 
      (
      p_date >= $1
      AND p_date < $2
      )
      AND user_id = $3    
      ORDER BY created_at DESC      
      ;
    `,
    [body.start, body.end, body.user_id])
    //console.log(ret.rows)
    db.close();
    return res.json({ret:200 , data:ret.rows });
  } catch (error) {
    db.close();
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/list', async function(req: any, res: any) {
  const db = new PGlite(process.env.DATA_DIR);
  try {
    const ret = await db.query(`
      SELECT * from plan;
    `)
    db.close();
    console.log(ret.rows)
    return res.json({ret:200 , data:ret.rows });
  } catch (error) {
    db.close();
    console.error(error);
    res.sendStatus(500);
  }
});
router.post('/delete', async function(req: any, res: any) {
  const db = drizzle(DATA_DIR);
  try {
    const body = req.body;
console.log(body);
      const deleteItem = await db
      .delete(plan)
      .where(eq(plan.id, body.id));
    return res.json({ret:200 , data:{}});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/update', async function(req: any, res: any) {
  const db = drizzle(DATA_DIR);
  try {
    const body = req.body;
    console.log(body);
    const updateItem = await db
      .update(plan)
      .set({ content: body.content })
      .where(eq(plan.id, body.id));
    return res.json({ret:200 , data:{}});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


export default router;
