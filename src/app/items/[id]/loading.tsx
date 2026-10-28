export default function ProductLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="skeleton h-9 w-64 rounded-full" />
        <div className="skeleton h-9 w-32 rounded-full" />
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="skeleton aspect-square rounded-2xl" />

        <div className="glass flex flex-col gap-5 rounded-2xl p-6 sm:p-8">
          <div className="skeleton h-9 w-3/4 rounded" />
          <div className="skeleton h-4 w-40 rounded" />
          <div className="skeleton h-10 w-36 rounded" />

          <div className="space-y-2">
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-2/3 rounded" />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="skeleton h-6 w-20 rounded-full" />
            <div className="skeleton h-6 w-24 rounded-full" />
            <div className="skeleton h-6 w-16 rounded-full" />
          </div>

          <div className="skeleton h-24 w-full rounded-xl" />
        </div>
      </div>
    </main>
  );
}
