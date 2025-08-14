import { generateText, tool } from "ai";
import { z } from "zod";
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { items } from '../db/schema';

export const getTodoList = tool({
  description: "TODO一覧を、表形式で表示します。",
  parameters: z.object({}),
  execute: async ({}) => {
    const db = drizzle(process.env.DB_FILE_NAME);
    const allItems = await db.select().from(items);
    return {resulte: allItems};
  },
});
