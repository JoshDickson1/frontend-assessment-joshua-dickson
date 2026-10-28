import type { ReactNode } from "react";

interface HeroProps {
  children: ReactNode;
}

export function Hero({ children }: HeroProps) {
  return (
    <section className="relative pb-12 pt-16 sm:pb-16 sm:pt-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Explore the catalog.
        </h1>
        <p className="mt-4 max-w-lg text-balance text-base leading-7 text-gray-600">
          Search across products, narrow by category, and open any item for the
          full details.
        </p>

        <div className="mt-10 w-full">{children}</div>
      </div>
    </section>
  );
}
