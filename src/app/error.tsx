"use client";

import { useEffect } from "react";
import { ProgressLink } from "@/components/NavigationProgress/ProgressLink";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-lg animate-[page-in_280ms_ease-out] flex-col items-center justify-center px-4 py-10 text-center motion-reduce:animate-none">
      <div className="glass w-full rounded-2xl px-6 py-12">
        <h1 className="text-2xl font-semibold text-gray-900">
          Something went wrong loading products
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Please try again. If the problem continues, come back later.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-10 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground transition hover:bg-accent/90"
          >
            Try again
          </button>
          <ProgressLink
            href="/"
            className="inline-flex h-10 items-center rounded-full border border-white/60 bg-white/60 px-5 text-sm font-medium text-gray-700 backdrop-blur-sm transition hover:bg-white hover:text-gray-900"
          >
            Back to home
          </ProgressLink>
        </div>
      </div>
    </main>
  );
}
