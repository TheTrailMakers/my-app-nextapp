"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { requestPasswordReset } from "@/lib/auth-client";
import AuthPageShell, {
  authFieldLabelClassName,
  authInlineLinkClassName,
  authInputClassName,
  authMutedTextClassName,
  authPrimaryButtonClassName,
} from "@/components/auth-page-shell";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { error: resetError } = await requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) {
        setError(resetError.message || "Something went wrong");
      } else {
        setSuccess(
          "If an account exists with this email, check your inbox for a reset link.",
        );
        setEmail("");
      }
    } catch {
      setError("Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageShell
      title="Reset password"
      subtitle="Enter your email to receive a reset link."
      error={error}
      success={success}
      form={
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="forgot-email" className={authFieldLabelClassName}>
              Email
            </label>
            <input
              id="forgot-email"
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

          <button
            type="submit"
            disabled={loading}
            className={authPrimaryButtonClassName}
          >
            {loading ? "Sending\u2026" : "Send reset link"}
          </button>
        </form>
      }
      footer={
        <p className={authMutedTextClassName}>
          Remember your password?{" "}
          <Link href="/login" className={authInlineLinkClassName}>
            Log in
          </Link>
        </p>
      }
    />
  );
}
