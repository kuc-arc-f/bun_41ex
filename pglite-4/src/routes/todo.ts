import express from 'express';
import { eq } from "drizzle-orm";
import { drizzle } from 'drizzle-orm/pglite';
import { todo } from "../schema";

const router = express.Router();
const DATA_DIR = process.env.DATA_DIR;

router.post('/create', async function(req: any, res: any) {
  const db = drizzle(DATA_DIR);
  try {
    const body = req.body;
    console.log(body);
    await db.insert(todo).values(body);

    return res.json({ret:200 , data:{}});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/list', async function(req: any, res: any) {
  const db = drizzle(DATA_DIR);
  try {
    const result = await db.select().from(todo);
//    console.log(result)

    return res.json({ret:200 , data:result });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/delete', async function(req: any, res: any) {
  const db = drizzle(DATA_DIR);
  try {
    const body = req.body;
    //console.log("url=", process.env.API_URL);
console.log(body);
      const deleteItem = await db
      .delete(todo)
      .where(eq(todo.id, body.id));
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
      .update(todo)
      .set({ title: body.title })
      .where(eq(todo.id, body .id));

    return res.json({ret:200 , data:{}});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


export default router;
