import { PGlite } from '@electric-sql/pglite'
import fs from 'node:fs/promises'
console.log("DATA_DIR=", process.env.DATA_DIR);
import 'dotenv/config';
import { createInterface } from "node:readline/promises";


async function descMain(tablename) {
  let dump = "";
  
  try {
    // DB 起動（メモリ／必要なら file: オプションで永続化）
    if(!process.env.DATA_DIR){
      console.error("error, .env DATA_DIR is not set");
      return;
    }
    const db = await new PGlite(process.env.DATA_DIR);
    
    const columns = await db.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name   = '${tablename}';      
    `);
    console.log(columns.rows);

    db.close();
  } catch (err) {
    console.error(err);
  }

}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  while (true) {
    const input = await rl.question("table_name:");
    if (input === "exit") {
      break;
    }
    console.log("input=", input);
    descMain(input);
    break;

    rl.write("\n");
  }
}

main().catch((err) => {
    console.error("Error:", err);
})
.finally(() => {
  rl.close();
});