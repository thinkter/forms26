import "dotenv/config";
import { drizzle } from "drizzle-orm/cockroach";
import * as schema from "./schema";

export const db = drizzle(process.env.DATABASE_URL!, { schema });
