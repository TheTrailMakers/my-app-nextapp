"use client";

import Link from "next/link";

export default function CoursesErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="max-w-lg rounded-2xl bg-card p-8 text-center shadow-xl">
        <h1 className="text-3xl font-bold text-foreground">
          Courses unavailable
        </h1>
        <p className="mt-4 text-muted-foreground">
          The courses section could not be loaded right now. Please retry or
          return to the homepage.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-border px-5 py-3 font-semibold text-foreground transition hover:bg-muted"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
