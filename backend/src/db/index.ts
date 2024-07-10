import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema.js";

const PGUSER = process.env.PGUSER || "postgres";
const PGPASSWORD = process.env.PGPASSWORD || "postgres";
const PGHOST = process.env.PGHOST || "localhost";
const PGPORT = process.env.PGPORT || "5432";

const { Client } = pg;

export const client = new Client({
  user: PGUSER,
  password: PGPASSWORD,
  host: PGHOST,
  port: parseInt(PGPORT),
});

await client.connect().then(() => {
  console.log(`Database connected: ${client.database}`);
}).catch(err => {
  console.error(err)
}).finally(() => {
  console.log(`Environment variables: user: ${PGUSER}; password: ${PGPASSWORD}; host: ${PGHOST}; PORT: ${PGPORT}`)
});

export const db = drizzle(client, { schema, logger: true });
