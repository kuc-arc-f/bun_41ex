import { PGlite } from '@electric-sql/pglite'
import fs from 'node:fs/promises'
console.log("DATA_DIR=", process.env.DATA_DIR);
import 'dotenv/config';
import ExportUtil from './src/ExportUtil';
import { createInterface } from "node:readline/promises";


async function exportMain(tablename) {
  let dump = "";
  
  try {
    // DB 起動（メモリ／必要なら file: オプションで永続化）
    if(!process.env.DATA_DIR){
      console.error("error, .env DATA_DIR is not set");
      return;
    }
    const db = await new PGlite(process.env.DATA_DIR);
    
    // SERIAL TABLE Check
    //serial_contain = await ExportUtil.serial_validate(db , tablename);
    //console.log("serial_contain=" , serial_contain );  

    const columns = await db.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = '${tablename}'
      ORDER BY ordinal_position
    `);
    console.log(columns.rows);

    let col_name = "";
    let col_name_select = "";
    const colDefs = columns.rows.map(col => {
      if(col.data_type === "timestamp without time zone"){
        col_name += `to_char(${col.column_name} ,'YYYY-MM-DD"T"HH24:MI:SS.US') as ${col.column_name},`;
      }else if(col.data_type === "timestamp with time zone"){
        col_name += `to_char(${col.column_name} ,'YYYY-MM-DD"T"HH24:MI:SS.US') as ${col.column_name},`;
      }else{
        col_name += `${col.column_name} ,`;
      }
      let def = `"${col.column_name} "`;
      return def;
    }).join(",\n  ");
    const new_col_name = col_name.slice(0, -1);
  console.log(new_col_name);

    const selectColDefs = columns.rows.map(col => {
      col_name_select += `${col.column_name} ,`;
      let def = `"${col.column_name} "`;
      return def;
    }).join(",\n  ");
    const new_col_name_select = col_name_select.slice(0, -1);
    console.log(new_col_name_select);

    const resultData = await db.query(`
      SELECT ${new_col_name} FROM ${tablename};
    `)  
    console.log(resultData.rows);
    for (const row of resultData.rows) {
      const values = Object.values(row)
        .map(v => v === null ? "NULL" : `'${String(v).replace(/'/g, "''")}'`)
        .join(", ");
      dump += `INSERT INTO "${tablename}" (${new_col_name_select}) VALUES (${values});\n`;
    }
    //if(serial_contain){
    //  dump += `SELECT setval( '${tablename}_seq', (SELECT MAX(id) FROM todo) + 1);\n`;
    //}

    dump += "\n";
    console.log(dump);
    db.close();
    await fs.writeFile('./dump.sql', dump);
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
    exportMain(input);
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