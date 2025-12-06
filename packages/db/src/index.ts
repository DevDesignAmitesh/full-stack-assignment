import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@repo/envs/envs";

const db = drizzle(env.DATABASE_URL);

export { db };
