# ACM Forms

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![Better Auth](https://img.shields.io/badge/auth-Better_Auth-7c3aed)
![Drizzle](https://img.shields.io/badge/database-Drizzle_%2B_PostgreSQL-C5F74F)

A Next.js authentication foundation for ACM forms, with Google sign-in and PostgreSQL-backed sessions.

</div>

```mermaid
sequenceDiagram
  participant U as User
  participant N as Next.js app
  participant A as Better Auth
  participant G as Google OAuth
  participant D as PostgreSQL

  U->>N: Choose Google sign-in
  N->>A: Start social sign-in
  A->>G: OAuth authorization
  G-->>A: Identity callback
  A->>D: Store user, account, and session
  A-->>U: Authenticated session cookie
```

## Stack

- Next.js App Router, React, and TypeScript.
- Better Auth with the Drizzle adapter.
- Drizzle ORM and PostgreSQL/Cockroach-compatible schemas.
- Tailwind CSS for styling.

## Setup

```bash
npm install
```

Create `.env.local`:

```dotenv
DATABASE_URL=postgresql://user:password@localhost:5432/acm_forms
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Configure the matching callback URL in Google Cloud, apply the checked-in Drizzle migrations to your database, then run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful paths

- `lib/auth.ts` configures Better Auth and Google sign-in.
- `app/api/auth/[...all]/route.ts` exposes the auth handlers.
- `db/` contains the Drizzle connection, schemas, and migrations.
- `app/components/google-login-button.tsx` implements the sign-in UI.
