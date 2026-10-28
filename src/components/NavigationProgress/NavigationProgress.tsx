interface NavigationProgressProps {
  visible: boolean;
}

export function NavigationProgress({ visible }: NavigationProgressProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 transition-opacity duration-200 motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="h-full w-1/3 animate-[loading-bar_1.1s_ease-in-out_infinite] bg-accent shadow-[0_0_8px_rgba(79,70,229,0.45)] motion-reduce:animate-none" />
    </div>
  );
}
