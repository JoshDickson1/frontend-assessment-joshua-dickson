import { ProgressLink } from "@/components/NavigationProgress/ProgressLink";

export default function ProductNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-lg animate-[page-in_280ms_ease-out] flex-col items-center justify-center px-4 py-10 text-center motion-reduce:animate-none">
      <div className="glass w-full rounded-2xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          404
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-900">
          Product not found
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          The product you are looking for may have been removed or never
          existed.
        </p>
        <ProgressLink
          href="/"
          className="mt-6 inline-flex h-10 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground transition hover:bg-accent/90"
        >
          Back to listing
        </ProgressLink>
      </div>
    </main>
  );
}
