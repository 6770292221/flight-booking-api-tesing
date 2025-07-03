// features/support/setup.ts
import dotenv from "dotenv";
import path from "path";

const env = process.env.ENV || "dev";
const envPath = path.resolve(__dirname, `../../configs/.env.${env}`);

dotenv.config({ path: envPath });

console.log(`Loaded .env.${env} from ${envPath}`);
