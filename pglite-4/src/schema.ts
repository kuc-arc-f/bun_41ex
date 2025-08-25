import { pgTable, integer , serial, timestamp, varchar, text , boolean } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  content: text("content"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const plan = pgTable("plan", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer("user_id").notNull(),
  content: text("content"),
  p_date: timestamp(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});
/*
const item = pgTable("item", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  content: text("content"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});
*/

