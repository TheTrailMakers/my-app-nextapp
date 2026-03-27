"use client";

import { useState, useEffect, Suspense, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { resetPassword } from "@/lib/auth-client";
import AuthPageShell, {
  authFieldLabelClassName,
  authInlineLinkClassName,
  authInputClassName,
  authMutedTextClassName,
  authPrimaryButtonClassName,
} from "@/components/auth-page-shell";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  useEffect(() => {
    setIsValidToken(!!token);
  }, [token]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 12) {
      setError("Password must be at least 12 characters");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("Invalid or expired reset token");
      setLoading(false);
      return;
    }

    try {
      const { error: resetError } = await resetPassword({
        token,
        newPassword,
      });

      if (!resetError) {
        setSuccess("Password reset. Redirecting to login\u2026");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(resetError.message || "Something went wrong");
      }
    } catch {
      setError("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  /* still resolving token */
  if (isValidToken === null) {
    return (
      <AuthPageShell
        title="Reset password"
        form={<p className={authMutedTextClassName}>Loading&hellip;</p>}
        footer={<span />}
      />
    );
  }

  /* no token */
  if (!isValidToken) {
    return (
      <AuthPageShell
        title="Invalid link"
        subtitle="This reset link is invalid or has expired."
        error=""
        form={
          <Link href="/forgot-password" className={authPrimaryButtonClassName}>
            Request a new link
          </Link>
        }
        footer={
          <p className={authMutedTextClassName}>
            Back to{" "}
            <Link href="/login" className={authInlineLinkClassName}>
              Log in
            </Link>
          </p>
        }
      />
    );
  }

  const passwordsMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;
  const passwordsMismatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  return (
    <AuthPageShell
      title="New password"
      error={error}
      success={success}
      form={
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="new-password" className={authFieldLabelClassName}>
              Password
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className={authInputClassName}
              placeholder="12 characters minimum"
              autoComplete="new-password"
              minLength={12}
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className={authFieldLabelClassName}
            >
              Confirm password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={authInputClassName}
              placeholder="Repeat your password"
              autoComplete="new-password"
              required
            />
            {passwordsMatch ? (
              <p className="mt-1.5 text-xs text-[oklch(0.45_0.1_150)]">
                Passwords match
              </p>
            ) : null}
            {passwordsMismatch ? (
              <p className="mt-1.5 text-xs text-[oklch(0.50_0.12_25)]">
                Passwords do not match
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={loading || passwordsMismatch}
            className={authPrimaryButtonClassName}
          >
            {loading ? "Resetting\u2026" : "Reset password"}
          </button>
        </form>
      }
      footer={
        <p className={authMutedTextClassName}>
          Back to{" "}
          <Link href="/login" className={authInlineLinkClassName}>
            Log in
          </Link>
        </p>
      }
    />
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <AuthPageShell
          title="Reset password"
          form={<p className={authMutedTextClassName}>Loading&hellip;</p>}
          footer={<span />}
        />
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
