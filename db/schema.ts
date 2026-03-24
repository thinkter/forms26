import {
  boolean,
  int4,
  cockroachTable,
  timestamp,
  varchar,
} from "drizzle-orm/cockroach-core";

export const usersTable = cockroachTable("users", {
  id: int4().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: int4().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const user = cockroachTable("user", {
  id: varchar({ length: 255 }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  emailVerified: boolean().notNull(),
  image: varchar({ length: 500 }),
  createdAt: timestamp({ withTimezone: true }).notNull(),
  updatedAt: timestamp({ withTimezone: true }).notNull(),
});

export const session = cockroachTable("session", {
  id: varchar({ length: 255 }).primaryKey(),
  expires: timestamp({ withTimezone: true }).notNull(),
  sessionToken: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp({ withTimezone: true }).notNull(),
  updatedAt: timestamp({ withTimezone: true }).notNull(),
  ipAddress: varchar({ length: 255 }),
  userAgent: varchar({ length: 500 }),
  userId: varchar({ length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = cockroachTable("account", {
  id: varchar({ length: 255 }).primaryKey(),
  accountId: varchar("providerAccountId", { length: 255 }).notNull(),
  providerId: varchar("provider", { length: 255 }).notNull(),
  userId: varchar({ length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: varchar("access_token", { length: 500 }),
  refreshToken: varchar("refresh_token", { length: 500 }),
  idToken: varchar("id_token", { length: 2048 }),
  accessTokenExpiresAt: timestamp("expires_at", { withTimezone: true }),
  refreshTokenExpiresAt: timestamp("refresh_expires_at", {
    withTimezone: true,
  }),
  scope: varchar({ length: 500 }),
  password: varchar({ length: 255 }),
  createdAt: timestamp({ withTimezone: true }).notNull(),
  updatedAt: timestamp({ withTimezone: true }).notNull(),
});

export const verification = cockroachTable("verification", {
  id: varchar({ length: 255 }).primaryKey(),
  identifier: varchar({ length: 255 }).notNull(),
  value: varchar({ length: 500 }).notNull(),
  expiresAt: timestamp({ withTimezone: true }).notNull(),
  createdAt: timestamp({ withTimezone: true }),
  updatedAt: timestamp({ withTimezone: true }),
});
