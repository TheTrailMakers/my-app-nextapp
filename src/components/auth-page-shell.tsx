import type { ReactNode } from "react";
import { ImageWithFallback as Image } from "@/components/imageWithFallback";

export const authFieldLabelClassName =
  "mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground";

export const authInputClassName =
  "w-full bg-transparent border-b border-border/50 py-3 text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-0 rounded-none rounded-t-sm hover:bg-black/5 dark:hover:bg-white/5 px-3";

export const authPrimaryButtonClassName =
  "relative w-full inline-flex items-center justify-center bg-foreground text-background px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all hover:bg-black/80 dark:hover:bg-white/80 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

export const authInlineLinkClassName =
  "relative inline-flex items-center text-primary font-medium transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100";

export const authMutedTextClassName = "text-sm font-body text-muted-foreground";

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
    <main className="min-h-screen w-full flex flex-col md:flex-row bg-[#F9F6F0] dark:bg-[#121415] selection:bg-primary/20">
      {/* Cinematic Image Section */}
      <div className="relative w-full h-[30vh] md:h-screen md:w-[45%] lg:w-[50%] overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-black/20 z-10 transition-opacity duration-1000 mix-blend-multiply dark:mix-blend-normal dark:bg-black/30" />
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600"
          alt="Mountains in the mist"
          fill
          className="object-cover transition-transform duration-[20s] hover:scale-[1.03]"
          priority
        />
        {/* Branding Overlay */}
        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 z-20 pr-6">
          <p className="text-white/80 text-[0.65rem] font-semibold uppercase tracking-[0.2em] mb-3 md:mb-4 drop-shadow-md">
            The Trail Makers
          </p>
          <h2 className="text-white font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight opacity-90 text-balance drop-shadow-md">
            Return to the wild.
          </h2>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col justify-center relative overflow-y-auto px-6 py-10 md:py-12 md:px-12 lg:px-20 xl:px-32">
        <div className="w-full max-w-sm mx-auto space-y-10 md:space-y-12 shrink-0 my-auto">
          {/* header */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground leading-tight tracking-tight">
              {title}
            </h1>
            {subtitle ? (
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground font-body">
                {subtitle}
              </p>
            ) : null}
          </div>

          {/* status messages */}
          {error ? (
            <div className="rounded-none border-l-2 border-destructive bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}
          {success ? (
            <div className="rounded-none border-l-2 border-green-500 bg-green-500/5 px-4 py-3 text-sm text-green-600 dark:text-green-400">
              {success}
            </div>
          ) : null}

          {/* form */}
          {form}

          {/* social */}
          {social ? (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <span className="h-px flex-1 bg-border/50" />
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">
                  Or
                </span>
                <span className="h-px flex-1 bg-border/50" />
              </div>
              {social}
            </div>
          ) : null}

          {/* footer */}
          <div className="pt-2">{footer}</div>
        </div>
      </div>
    </main>
  );
}
