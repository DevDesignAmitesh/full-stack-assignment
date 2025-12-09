import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, and } from "drizzle-orm";
import * as schema from "./schema";

const db = drizzle(process.env.DATABASE_URL!, {
  schema,
});

export { db, schema, eq, and };
