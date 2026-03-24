"use client";

import { useState } from "react";

type SocialSignInResponse = {
  url?: string;
  redirect?: boolean;
};

export function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/auth/sign-in/social", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          provider: "google",
          callbackURL: "/",
        }),
      });

      if (!response.ok) {
        throw new Error("Google sign-in request failed");
      }

      const data = (await response.json()) as SocialSignInResponse;
      if (!data.url) {
        throw new Error("Missing OAuth redirect URL");
      }

      window.location.href = data.url;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 sm:items-start">
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex h-12 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {loading ? "Redirecting..." : "Login with Google"}
      </button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
