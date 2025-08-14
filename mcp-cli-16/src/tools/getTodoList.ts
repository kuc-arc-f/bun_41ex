import { generateText, tool } from "ai";
import { z } from "zod";
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { items } from '../db/schema';

//  description: "TODO一覧を、markdown記法の表形式で表示します。",
export const getTodoList = tool({
  description: "TODO一覧を、表形式で表示します。",
  parameters: z.object({}),
  execute: async ({}) => {
    const db = drizzle(process.env.DB_FILE_NAME);
    const allItems = await db.select().from(items);
    return {resulte: allItems};

    /*
    const url = process.env.API_URL;
    const item = {}
    const response = await fetch(url + "/api/todos/list" ,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      }
    );
    if(response.ok === false){
      throw new Error("Error, response <> OK:");
    }
    const json = await response.json();
    const out = JSON.parse(json.data) 
    const wkItems = [];
    let rowMd = "";
    out.forEach((row) => {
      let target = "| "+ row.title +  "| "+ row.created_at + " | "+ "\n";
      rowMd += target;
    });
    let text = `| TODO | 作成日時 |
    |:----:|:----:|
    ${rowMd}
    `;
    console.log(text);
    return "";
    */
  },
});
