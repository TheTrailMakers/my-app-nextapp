import type { ReactNode } from "react";

export const authFieldLabelClassName =
  "mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground";

export const authInputClassName =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground transition duration-normal focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50";

export const authPrimaryButtonClassName =
  "inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold tracking-wide text-primary-foreground transition-colors duration-normal hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50";

export const authInlineLinkClassName =
  "font-medium text-primary transition-colors hover:text-primary/80 hover:underline underline-offset-4";

export const authMutedTextClassName = "text-sm text-muted-foreground";

type AuthPageShellProps = {
  title: string;
  subtitle?: string;
  form: ReactNode;
  social?: ReactNode;
  footer: ReactNode;
  error?: string;
  success?: string;
};

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
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 text-foreground">
      {/* faint decorative line */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-[min(18rem,40vw)] bg-gradient-to-b from-transparent via-border to-transparent opacity-50" />

      <div className="w-full max-w-sm space-y-10 z-[1]">
        {/* brand */}
        <p className="text-[0.66rem] font-semibold uppercase tracking-widest text-muted-foreground">
          The Trail Makers
        </p>

        {/* heading */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-foreground font-display">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>

        {/* status messages */}
        {error ? (
          <div className="rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className="rounded-md border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400">
            {success}
          </div>
        ) : null}

        {/* form */}
        {form}

        {/* social */}
        {social ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                or
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
            {social}
          </div>
        ) : null}

        {/* footer */}
        <div className="text-sm text-muted-foreground">{footer}</div>
      </div>
    </main>
  );
}
