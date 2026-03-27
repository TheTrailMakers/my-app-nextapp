"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession, signIn } from "@/lib/auth-client";
import GoogleButton from "@/components/google-button";
import AuthPageShell, {
  authFieldLabelClassName,
  authInlineLinkClassName,
  authInputClassName,
  authMutedTextClassName,
  authPrimaryButtonClassName,
} from "@/components/auth-page-shell";

type LoginClientProps = {
  nextPath: string | null;
};

export default function LoginClient({ nextPath }: LoginClientProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: signInError } = await signIn.email({
        email,
        password,
      });

      if (signInError) {
        const message =
          typeof signInError.message === "string" &&
          signInError.message.length > 0
            ? signInError.message
            : "Invalid email or password";
        setError(message);
        return;
      }

      if (nextPath) {
        router.push(nextPath);
        router.refresh();
        return;
      }

      const sessionResult = await getSession();
      const userRole = (
        sessionResult.data?.user as { role?: string } | undefined
      )?.role;

      if (
        userRole === "ADMIN" ||
        userRole === "SUPER_ADMIN" ||
        userRole === "MODERATOR"
      ) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("signIn error:", err);
    } finally {
      setLoading(false);
    }
  };

  async function signInWithSocial(provider: "facebook" | "google") {
    const callbackBaseUrl =
      typeof window === "undefined" ? "" : window.location.origin;
    const { data, error } = await signIn.social({
      provider,
      callbackURL: `${callbackBaseUrl}/dashboard`,
      errorCallbackURL: `${callbackBaseUrl}/error`,
    });
    if (error || !data) {
      if (error) {
        const message =
          typeof error.message === "string" && error.message.length > 0
            ? error.message
            : "Login failed. Please try again.";
        setError(message);
        return;
      }
    }
  }

  return (
    <AuthPageShell
      title="Log in"
      error={error}
      form={
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="login-email" className={authFieldLabelClassName}>
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={authInputClassName}
              placeholder="name@example.com"
              autoComplete="email"
              spellCheck={false}
              required
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="login-password"
                className={authFieldLabelClassName}
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[oklch(0.48_0.015_55)] transition hover:text-[oklch(0.36_0.02_55)]"
              >
                Forgot?
              </Link>
            </div>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={authInputClassName}
              placeholder="Your password"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={authPrimaryButtonClassName}
          >
            {loading ? "Logging in\u2026" : "Log in"}
          </button>
        </form>
      }
      social={
        <GoogleButton
          label="Continue with Google"
          className="h-12 w-full rounded-xl border-[oklch(0.88_0.015_70)] bg-transparent text-[oklch(0.28_0.02_55)] shadow-none hover:bg-[oklch(0.97_0.005_80)]"
          onClick={() => signInWithSocial("google")}
        />
      }
      footer={
        <p className={authMutedTextClassName}>
          No account?{" "}
          <Link href="/signup" className={authInlineLinkClassName}>
            Sign up
          </Link>
        </p>
      }
    />
  );
}
