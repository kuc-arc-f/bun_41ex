import { defineConfig } from "drizzle-kit";
import 'dotenv/config'
console.log("DATA_DIR=", process.env.DATA_DIR)

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATA_DIR,
  },
  driver: "pglite",
});

