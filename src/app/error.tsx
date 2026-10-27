"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold text-gray-900">
        Something went wrong loading products
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Please try again. If the problem continues, come back later.
      </p>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
