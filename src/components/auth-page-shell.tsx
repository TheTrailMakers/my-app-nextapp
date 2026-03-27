import type { ReactNode } from "react";

/* ─── palette tokens (oklch, warm-tinted neutrals) ─── */
const bg = "oklch(0.97_0.008_75)";
const surface = "oklch(0.993_0.005_80)";
const border = "oklch(0.88_0.015_70)";
const textPrimary = "oklch(0.22_0.02_55)";
const textSecondary = "oklch(0.48_0.015_55)";
const textTertiary = "oklch(0.58_0.01_55)";
const accent = "oklch(0.50_0.13_40)";
const accentHover = "oklch(0.44_0.13_40)";
const errorBg = "oklch(0.94_0.025_25)";
const errorBorder = "oklch(0.82_0.08_25)";
const errorText = "oklch(0.42_0.12_25)";
const successBg = "oklch(0.94_0.03_145)";
const successBorder = "oklch(0.82_0.06_145)";
const successText = "oklch(0.38_0.08_150)";

/* ─── shared class names ─── */

export const authFieldLabelClassName = `mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[${textSecondary}]`;

export const authInputClassName = `w-full rounded-xl border border-[${border}] bg-[${surface}] px-4 py-3 text-[${textPrimary}] placeholder:text-[${textTertiary}] transition duration-150 focus:border-[${accent}] focus:outline-none`;

export const authPrimaryButtonClassName = `inline-flex w-full items-center justify-center rounded-xl bg-[${accent}] px-5 py-3 text-sm font-semibold tracking-wide text-[oklch(0.98_0.005_80)] transition duration-150 hover:bg-[${accentHover}] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50`;

export const authInlineLinkClassName = `font-medium text-[${accent}] transition hover:text-[${accentHover}]`;

export const authMutedTextClassName = `text-sm text-[${textSecondary}]`;

/* ─── types ─── */

type AuthPageShellProps = {
  title: string;
  subtitle?: string;
  form: ReactNode;
  social?: ReactNode;
  footer: ReactNode;
  error?: string;
  success?: string;
};

/* ─── component ─── */

export default function AuthPageShell({
  title,
  subtitle,
  form,
  social,
  footer,
  error,
  success,
}: AuthPageShellProps) {
  return (
    <main
      className={`relative isolate flex min-h-screen flex-col items-center justify-center bg-[${bg}] px-4 py-12 text-[${textPrimary}]`}
    >
      {/* faint decorative line */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-[min(18rem,40vw)] bg-[linear-gradient(to_bottom,transparent_10%,${border}_50%,transparent_90%)]`}
      />

      <div className="w-full max-w-104 space-y-10">
        {/* brand */}
        <p
          className={`text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[${textTertiary}]`}
        >
          The Trail Makers
        </p>

        {/* heading */}
        <div className="space-y-1.5">
          <h1
            className={`text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[${textPrimary}]`}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className={`text-[0.9rem] leading-relaxed text-[${textSecondary}]`}
            >
              {subtitle}
            </p>
          ) : null}
        </div>

        {/* status messages */}
        {error ? (
          <div
            className={`rounded-xl border border-[${errorBorder}] bg-[${errorBg}] px-4 py-3 text-sm text-[${errorText}]`}
          >
            {error}
          </div>
        ) : null}
        {success ? (
          <div
            className={`rounded-xl border border-[${successBorder}] bg-[${successBg}] px-4 py-3 text-sm text-[${successText}]`}
          >
            {success}
          </div>
        ) : null}

        {/* form */}
        {form}

        {/* social */}
        {social ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`h-px flex-1 bg-[${border}]`} />
              <span
                className={`text-[0.62rem] font-medium uppercase tracking-[0.22em] text-[${textTertiary}]`}
              >
                or
              </span>
              <span className={`h-px flex-1 bg-[${border}]`} />
            </div>
            {social}
          </div>
        ) : null}

        {/* footer */}
        <div className={`text-sm text-[${textSecondary}]`}>{footer}</div>
      </div>
    </main>
  );
}
