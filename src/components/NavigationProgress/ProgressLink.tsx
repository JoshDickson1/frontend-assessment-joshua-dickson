"use client";

import Link, { useLinkStatus } from "next/link";
import { useEffect, useRef, type ComponentProps } from "react";
import { useNavigationProgress } from "@/components/NavigationProgress/NavigationProgressProvider";

function LinkStatusReporter() {
  const { pending } = useLinkStatus();
  const { start, complete } = useNavigationProgress();
  const wasPending = useRef(false);

  useEffect(() => {
    if (pending) {
      wasPending.current = true;
      start();
    } else if (wasPending.current) {
      wasPending.current = false;
      complete();
    }
  }, [pending, start, complete]);

  useEffect(
    () => () => {
      if (wasPending.current) {
        wasPending.current = false;
        complete();
      }
    },
    [complete],
  );

  return null;
}

export function ProgressLink(props: ComponentProps<typeof Link>) {
  return (
    <Link {...props}>
      <LinkStatusReporter />
      {props.children}
    </Link>
  );
}
