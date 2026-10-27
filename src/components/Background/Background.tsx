export function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -left-32 -top-40 h-[36rem] w-[36rem] rounded-full bg-blob-one blur-3xl" />
      <div className="absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-blob-two blur-3xl" />
    </div>
  );
}
