import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        404
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-gray-900">
        Product not found
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        The product you are looking for may have been removed or never existed.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Back to listing
      </Link>
    </main>
  );
}
