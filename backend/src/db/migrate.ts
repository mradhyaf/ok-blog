import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { client, db } from "./index.js";

async function main() {
  await migrate(db, { migrationsFolder: "./drizzle-migrations" });
  await client.end();
}

main();
