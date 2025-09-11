import { PGlite } from '@electric-sql/pglite'

const hcmUtil = {

  isTableExists: async function (db: any, tablename: string) {
    let ret = false;
    try {
      const result = await db.query(`
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = $1
        )
      `, [tablename]);
      if(result.rows[0]){
        console.log("isTableExists=" , result.rows[0]);
        ret = result.rows[0].exists;
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
      const sql = `
        CREATE TABLE IF NOT EXISTS ${tablename} (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          data TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
      const result = await db.exec(sql);
      return ret;
    }catch(e){
      console.error(e);
      throw new Error("isTableExists , error");
   }
  }, 

}
export default hcmUtil;