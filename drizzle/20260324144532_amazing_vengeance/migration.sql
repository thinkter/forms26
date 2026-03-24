CREATE TABLE "account" (
	"id" varchar(255) PRIMARY KEY,
	"providerAccountId" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"userId" varchar(255) NOT NULL,
	"access_token" varchar(500),
	"refresh_token" varchar(500),
	"id_token" varchar(2048),
	"expires_at" timestamptz,
	"refresh_expires_at" timestamptz,
	"scope" varchar(500),
	"password" varchar(255),
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" varchar(255) PRIMARY KEY,
	"expires" timestamptz NOT NULL,
	"sessionToken" varchar(255) NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	"ipAddress" varchar(255),
	"userAgent" varchar(500),
	"userId" varchar(255) NOT NULL,
	CONSTRAINT "session_sessionToken_key" UNIQUE("sessionToken")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar(255) PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"emailVerified" bool NOT NULL,
	"image" varchar(500),
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "user_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" varchar(255) PRIMARY KEY,
	"identifier" varchar(255) NOT NULL,
	"value" varchar(500) NOT NULL,
	"expiresAt" timestamptz NOT NULL,
	"createdAt" timestamptz,
	"updatedAt" timestamptz
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE;