
const hcmUtil = {

  isTableExists: async function (db: any, tableName: string) {
    let ret = false;
    try {
      const result = await db.run<{
        name: string;
      }>(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`);

      if (result.rows.length > 0) {
        ret = true;
        //console.log(`✅ テーブル ${tableName} は存在します`);
      } else {
        //console.log(`❌ テーブル ${tableName} は存在しません`);
      }
      return ret;
    }catch(e){
      console.error(e);
      throw new Error("isTableExists , error");
   }
  }, 

  
  createTable: async function (db: any, tablename: string) {
    let ret = false;
    try {
      const sql = `CREATE TABLE IF NOT EXISTS ${tablename} (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        data TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP        
      )
      `;
      console.log(sql);
      const result = await db.run(sql);
      return ret;
    }catch(e){
      console.error(e);
      throw new Error("isTableExists , error");
   }
  }, 

}
export default hcmUtil;