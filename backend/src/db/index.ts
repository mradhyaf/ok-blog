import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema.js";

const PGUSER = process.env.PGUSER || "postgres";
const PGPASSWORD = process.env.PGPASSWORD || "postgres";
const PGHOST = process.env.PGHOST || "localhost";
const PGPORT = process.env.PGPORT || "5432";
const PGDATABASE = process.env.PGDATABASE || "postgres";

const { Client } = pg;

export const client = new Client({
  user: PGUSER,
  password: PGPASSWORD,
  host: PGHOST,
  port: parseInt(PGPORT),
  database: PGDATABASE,
});

await client.connect().then(() => {
  console.log(`Database connected: ${client.database}`);
});
export const db = drizzle(client, { schema, logger: true });
