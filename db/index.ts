import "dotenv/config";
import { drizzle } from "drizzle-orm/cockroach";

export const db = drizzle(process.env.DATABASE_URL!);
