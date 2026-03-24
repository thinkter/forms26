import "dotenv/config";
import { drizzle } from "drizzle-orm/cockroach";

const db = drizzle(process.env.DATABASE_URL!);
