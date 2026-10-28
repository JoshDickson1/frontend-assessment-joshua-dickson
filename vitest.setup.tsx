import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import {
  createElement,
  type ComponentProps,
  type ImgHTMLAttributes,
} from "react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

type MockImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean;
  unoptimized?: boolean;
};

vi.mock("next/image", () => ({
  default: ({ priority, unoptimized, ...props }: MockImageProps) => {
    void priority;
    void unoptimized;

    return createElement("img", { ...props, alt: props.alt ?? "" });
  },
}));

vi.mock("@/components/NavigationProgress/ProgressLink", () => ({
  ProgressLink: ({ children, ...props }: ComponentProps<"a">) => (
    <a {...props}>{children}</a>
  ),
}));
