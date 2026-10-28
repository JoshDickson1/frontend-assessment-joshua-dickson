import { ProgressLink } from "@/components/NavigationProgress/ProgressLink";

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-1 animate-[page-in_280ms_ease-out] flex-col items-center justify-center px-4 py-10 text-center motion-reduce:animate-none"
    >
      <div className="glass w-full rounded-2xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          404
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-900">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          The page you are looking for may have moved or never existed.
        </p>
        <ProgressLink
          href="/"
          className="focus-ring mt-6 inline-flex h-10 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground transition hover:bg-accent/90"
        >
          Back to listing
        </ProgressLink>
      </div>
    </main>
  );
}
