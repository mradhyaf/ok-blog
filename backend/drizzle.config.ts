import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const PGUSER = process.env.PGUSER || "postgres";
const PGPASSWORD = process.env.PGPASSWORD || "postgres";
const PGHOST = process.env.PGHOST || "localhost";
const PGPORT = process.env.PGPORT || "5432";
const PGDATABASE = process.env.PGDATABASE || "postgres";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle-migrations",
  dialect: "postgresql",
  dbCredentials: {
    user: PGUSER,
    password: PGPASSWORD,
    host: PGHOST,
    port: parseInt(PGPORT),
    database: PGDATABASE,
  },
  verbose: true,
});
