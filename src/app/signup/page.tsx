"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signUp } from "@/lib/auth-client";
import GoogleButton from "@/components/google-button";
import AuthPageShell, {
  authFieldLabelClassName,
  authInlineLinkClassName,
  authInputClassName,
  authMutedTextClassName,
  authPrimaryButtonClassName,
} from "@/components/auth-page-shell";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const signUpPayload = {
        email,
        password,
        username,
        name: username,
      } as Parameters<typeof signUp.email>[0];

      const { error: signUpError } = await signUp.email(signUpPayload);

      if (signUpError) {
        setError(signUpError.message || "Signup failed");
        return;
      }

      router.push("/login");
    } catch {
      setError("An error occurred. Please try again.");
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
      title="Create account"
      error={error}
      form={
        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label
              htmlFor="signup-username"
              className={authFieldLabelClassName}
            >
              Username
            </label>
            <input
              id="signup-username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className={authInputClassName}
              placeholder="Your username"
              autoComplete="username"
              spellCheck={false}
              required
            />
          </div>

          <div>
            <label htmlFor="signup-email" className={authFieldLabelClassName}>
              Email
            </label>
            <input
              id="signup-email"
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
            <label
              htmlFor="signup-password"
              className={authFieldLabelClassName}
            >
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={authInputClassName}
              placeholder="12 characters minimum"
              autoComplete="new-password"
              minLength={12}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={authPrimaryButtonClassName}
          >
            {loading ? "Creating account\u2026" : "Create account"}
          </button>
        </form>
      }
      social={
        <GoogleButton
          label="Sign up with Google"
          className="h-12 w-full rounded-xl border-[oklch(0.88_0.015_70)] bg-transparent text-[oklch(0.28_0.02_55)] shadow-none hover:bg-[oklch(0.97_0.005_80)]"
          onClick={() => signInWithSocial("google")}
        />
      }
      footer={
        <p className={authMutedTextClassName}>
          Already have an account?{" "}
          <Link href="/login" className={authInlineLinkClassName}>
            Log in
          </Link>
        </p>
      }
    />
  );
}
