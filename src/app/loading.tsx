import { ProductGridSkeleton } from "@/components/Skeletons/ProductGridSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <section className="pb-12 pt-16 sm:pb-16 sm:pt-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="skeleton h-12 w-72 max-w-full rounded-xl sm:h-14 sm:w-96" />
          <div className="skeleton mt-4 h-5 w-full max-w-lg rounded" />
          <div className="mt-10 flex h-[108px] w-full max-w-2xl flex-col gap-3 sm:h-12 sm:flex-row">
            <div className="skeleton h-12 flex-1 rounded-control" />
            <div className="skeleton h-12 rounded-control sm:w-52" />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="skeleton h-5 w-40 rounded" />
        </div>
        <ProductGridSkeleton />
      </section>
    </main>
  );
}
