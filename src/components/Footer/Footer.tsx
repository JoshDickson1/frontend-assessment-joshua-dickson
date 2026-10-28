import { ArrowUp, Code2, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";

const footerLinkClass =
  "inline-flex items-center gap-1.5 rounded-md text-gray-700 transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 motion-reduce:transition-none";

export function Footer() {
  return (
    <footer className="border-t border-white/70 bg-white/90 backdrop-blur-glass supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-sm"
            >
              <Sparkles strokeWidth={1.8} className="h-3.5 w-3.5" />
            </span>
            <span className="font-display text-lg leading-none tracking-tight text-gray-900">
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
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
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
            <a href="#top" className={footerLinkClass}>
              Back to top
              <ArrowUp
                aria-hidden="true"
                strokeWidth={1.8}
                className="h-3.5 w-3.5"
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
