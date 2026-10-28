"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { NavigationProgress } from "@/components/NavigationProgress/NavigationProgress";

interface NavigationProgressContextValue {
  start: () => void;
  complete: () => void;
}

const NavigationProgressContext =
  createContext<NavigationProgressContextValue | null>(null);

const MIN_VISIBLE_MS = 260;

export function useNavigationProgress() {
  const context = useContext(NavigationProgressContext);

  if (!context) {
    throw new Error(
      "useNavigationProgress must be used within NavigationProgressProvider",
    );
  }

  return context;
}

interface NavigationProgressProviderProps {
  children: ReactNode;
}

export function NavigationProgressProvider({
  children,
}: NavigationProgressProviderProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const startedAt = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimer = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearHideTimer();
    startedAt.current = Date.now();
    setVisible(true);
  }, [clearHideTimer]);

  const complete = useCallback(() => {
    const elapsed = Date.now() - startedAt.current;
    const delay = Math.max(0, MIN_VISIBLE_MS - elapsed);

    clearHideTimer();
    hideTimer.current = setTimeout(() => {
      setVisible(false);
      hideTimer.current = null;
    }, delay);
  }, [clearHideTimer]);

  useEffect(() => clearHideTimer, [clearHideTimer]);

  useEffect(() => {
    complete();
  }, [pathname, complete]);

  const value = useMemo(() => ({ start, complete }), [start, complete]);

  return (
    <NavigationProgressContext.Provider value={value}>
      {children}
      <NavigationProgress visible={visible} />
    </NavigationProgressContext.Provider>
  );
}
