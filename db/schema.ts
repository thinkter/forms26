import { int4, cockroachTable, varchar } from "drizzle-orm/cockroach-core";

export const usersTable = cockroachTable("users", {
  id: int4().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: int4().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
