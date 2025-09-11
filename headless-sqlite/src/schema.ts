import { int, sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { sql } from 'drizzle-orm';

export const hcm_data = sqliteTable('hcm_data', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  data: text('data').notNull(),
  created_at: text('created_at').notNull().default(new Date().toISOString()),
  updated_at: text('updated_at').notNull().default(new Date().toISOString())
});
