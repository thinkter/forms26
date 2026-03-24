import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
// export const auth = betterAuth({
//   database: drizzleAdapter(db, {
//     provider: "pg", // or "pg" or "mysql"
//   }),
//   //... the rest of your config
// });

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  // database: prismaAdapter(prisma, {
  //   provider: "cockroachdb",
  // }),
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
  }),
  session: {
    fields: {
      expiresAt: "expires",
      token: "sessionToken",
    },
  },
  account: {
    fields: {
      providerId: "provider",
      accountId: "providerAccountId",
      refreshToken: "refresh_token",
      accessToken: "access_token",
      accessTokenExpiresAt: "expires_at",
      idToken: "id_token",
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      hd: "vitstudent.ac.in",
      accessType: "offline",
      prompt: "select_account consent",
    },
  },
  experimental: { joins: true },
  // plugins: [nextCookies()], //keep nextcookies at the end of this array
});
