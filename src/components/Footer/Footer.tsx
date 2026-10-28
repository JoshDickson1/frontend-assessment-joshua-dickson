import { ArrowUp, Code2, ExternalLink, Sparkle } from "lucide-react";
import Link from "next/link";

const footerLinkClass =
  "inline-flex items-center gap-1.5 rounded-md text-gray-700 transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 motion-reduce:transition-none";

export function Footer() {
  return (
    <footer className="border-t border-white/70 bg-white/90 backdrop-blur-glass supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-12 pt-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-sm"
            >
              <Sparkle
                strokeWidth={1.5}
                fill="currentColor"
                className="h-3.5 w-3.5"
              />
            </span>
            <span className="font-sans text-lg font-semibold leading-none tracking-tight text-gray-900">
              Content Explorer
            </span>
          </Link>
          <p className="text-sm text-gray-600">
            A take-home project by Joshua Dickson.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm"
          >
            <a
              href="https://dummyjson.com"
              target="_blank"
              rel="noopener noreferrer"
              className={footerLinkClass}
            >
              Data from DummyJSON
              <ExternalLink
                aria-hidden="true"
                strokeWidth={1.8}
                className="h-3.5 w-3.5"
              />
            </a>
            <a
              href="https://github.com/JoshDickson1/frontend-assessment-joshua-dickson"
              target="_blank"
              rel="noopener noreferrer"
              className={footerLinkClass}
            >
              GitHub
              <Code2
                aria-hidden="true"
                strokeWidth={1.8}
                className="h-3.5 w-3.5"
              />
            </a>
            <a
              href="#top"
              aria-label="Back to top"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200/80 bg-white/70 text-gray-600 transition-colors duration-200 hover:border-accent/30 hover:bg-white hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 motion-reduce:transition-none"
            >
              <ArrowUp
                aria-hidden="true"
                strokeWidth={1.8}
                className="h-4 w-4"
              />
            </a>
          </nav>
          <p className="text-sm text-gray-600">
            Built with Next.js, TypeScript and Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
}
