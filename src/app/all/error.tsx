"use client";

import Link from "next/link";

export default function AllTreksErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-lg rounded-2xl bg-card p-8 text-center shadow-warm">
        <h1 className="text-3xl font-bold text-foreground">
          Treks unavailable
        </h1>
        <p className="mt-4 text-muted-foreground">
          The trek catalog could not be loaded right now. Please retry or
          contact the team.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-pill bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="rounded-pill border border-border px-5 py-3 font-semibold text-foreground transition hover:bg-muted"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
