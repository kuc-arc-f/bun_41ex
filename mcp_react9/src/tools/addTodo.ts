import { generateText, tool } from "ai";
import { z } from "zod";
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { items } from '../db/schema';

export const addTodo = tool({
  description: "指定した 文字列をデータベースに登録する。",
  // ツールを呼び出すパラメータ
  parameters: z.object({
    text: z.string().min(1, { message: 'タイトルは必須です' })
  }),
  execute: async ({ text }) => {
    const db = drizzle(process.env.DB_FILE_NAME);
    const newItem = {
      title: text,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const result = await db.insert(items).values(newItem).returning();
    return "result : " + text;
  },
});
