
const ExportUtil = {
  
  hello: function(){
    console.log("hello");
  },

  serial_validate: async function(db, tablename){
    try{
      let ret = false;
      const result_serial = await db.query(`
        SELECT
        table_name,
        column_name,
        data_type,
        column_default
        FROM
        information_schema.columns
        WHERE
        table_name = '${tablename}' AND column_default LIKE 'nextval%';
    `);
      console.log(result_serial.rows);
      if(result_serial.rows.length > 0){
        ret = true;
      }
      return ret;
    }catch(e){
      console.error(e);
      throw new Error("error , serial_validate");
    }

  },

  drop_validate: async function(db, tablename){
    try{
      let ret = false;
      const result = await db.query(`
        SELECT EXISTS (
          SELECT 1
          FROM   information_schema.tables 
          WHERE  table_schema = 'public'
          AND    table_name = '${tablename}'
        );
      `);
      //console.log(result.rows);
      if(result.rows[0]){
        console.log(result.rows[0].exists);
        ret = result.rows[0].exists;
      }
      return ret;
    }catch(e){
      console.error(e);
      throw new Error("error , serial_validate");
    }

  },


}
export default ExportUtil;