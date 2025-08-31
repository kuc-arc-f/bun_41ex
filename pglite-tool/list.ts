
import readline from 'node:readline';
import 'dotenv/config';
import { PGlite } from '@electric-sql/pglite'
console.log("DATA_DIR=", process.env.DATA_DIR);
console.log("VER= 0.9.1");

const main = async function(){
  try{
    if(!process.env.DATA_DIR){
      console.error("error, .env DATA_DIR is not set");
      return;
    }
    const db = new PGlite(process.env.DATA_DIR);
    const ret = await db.query(`
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public';      
    `);
    db.close();
    console.log(ret.rows)
  }catch(e){ console.error(e); }
}
main();
