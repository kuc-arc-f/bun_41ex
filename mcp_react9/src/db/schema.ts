import { int, sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { sql } from 'drizzle-orm';

export const items = sqliteTable('items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  created_at: text('created_at').notNull().default(new Date().toISOString()),
  updated_at: text('updated_at').notNull().default(new Date().toISOString())
});

export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;

