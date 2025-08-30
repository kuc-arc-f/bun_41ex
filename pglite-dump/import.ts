import { PGlite } from '@electric-sql/pglite'
import fs from 'node:fs/promises'
console.log("DATA_DIR=", process.env.DATA_DIR);
import 'dotenv/config';
import ExportUtil from './src/ExportUtil';

async function main() {
  let dump = "";
  let serial_contain = false;
  try {
    // DB 起動（メモリ／必要なら file: オプションで永続化）
    if(!process.env.DATA_DIR){
      console.error("error, .env DATA_DIR is not set");
      return;
    }
    const db = await new PGlite(process.env.DATA_DIR);
    
    let data = await fs.readFile(`./dump.sql`, 'utf8');
    console.log(data);
    const result_import = await db.exec(`${data}`);

    //console.log(dump);
  } catch (err) {
    console.error(err);
  }

}
main()

