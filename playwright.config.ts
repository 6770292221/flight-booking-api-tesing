import { defineConfig } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "path";

// Load .env
const ENV = process.env.ENV || "dev";
dotenv.config({ path: path.resolve(__dirname, `configs/.env.${ENV}`) });

const baseURL = process.env.BASE_URL || "http://localhost:3000";
console.log(`ENV=${ENV} | BASE_URL=${baseURL}`);

export default defineConfig({
  testDir: "./tests",
  timeout: 30000, // เผื่อ call API ช้า
  use: {
    baseURL,
    extraHTTPHeaders: {
      "Content-Type": "application/json",
    },
  },
});
