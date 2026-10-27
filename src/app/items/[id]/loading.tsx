export default function ProductLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 h-4 w-64 animate-pulse rounded bg-gray-200 motion-reduce:animate-none" />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="aspect-square animate-pulse rounded-2xl bg-gray-200 motion-reduce:animate-none" />

        <div className="flex flex-col gap-5">
          <div className="h-6 w-28 animate-pulse rounded-full bg-gray-200 motion-reduce:animate-none" />
          <div className="h-9 w-3/4 animate-pulse rounded bg-gray-200 motion-reduce:animate-none" />
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200 motion-reduce:animate-none" />
          <div className="h-10 w-36 animate-pulse rounded bg-gray-200 motion-reduce:animate-none" />

          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200 motion-reduce:animate-none" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200 motion-reduce:animate-none" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 motion-reduce:animate-none" />
          </div>

          <div className="h-28 w-full animate-pulse rounded-xl bg-gray-200 motion-reduce:animate-none" />
        </div>
      </div>
    </main>
  );
}
