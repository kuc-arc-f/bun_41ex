import { PGlite } from '@electric-sql/pglite'
import 'dotenv/config'
console.log("DATA_DIR=", process.env.DATA_DIR)

const db = new PGlite(process.env.DATA_DIR)
await db.exec(`
CREATE TABLE IF NOT EXISTS hcm_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  data TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

`)

// SELECT
const ret = await db.query(`
  SELECT * from hcm_data;
`)
console.log(ret.rows)
