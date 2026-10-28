import { describe, expect, it } from "vitest";
import {
  getPageItems,
  getTotalPages,
  parsePage,
} from "@/lib/pagination";

describe("getPageItems", () => {
  it("returns every page when there are seven or fewer", () => {
    expect(getPageItems(1, 1)).toEqual([1]);
    expect(getPageItems(3, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPageItems(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("shows the first pages and the final page on page one", () => {
    expect(getPageItems(1, 10)).toEqual([1, 2, 3, "ellipsis", 10]);
  });

  it("expands the first three pages", () => {
    expect(getPageItems(3, 10)).toEqual([1, 2, 3, 4, "ellipsis", 10]);
  });

  it("centers the current page in the middle", () => {
    expect(getPageItems(5, 10)).toEqual([
      1,
      "ellipsis",
      4,
      5,
      6,
      "ellipsis",
      10,
    ]);
  });

  it("shows the first page and the final pages near the end", () => {
    expect(getPageItems(9, 10)).toEqual([1, "ellipsis", 8, 9, 10]);
    expect(getPageItems(10, 10)).toEqual([1, "ellipsis", 8, 9, 10]);
  });

  it("handles the boundary at eight pages", () => {
    expect(getPageItems(4, 8)).toEqual([
      1,
      "ellipsis",
      3,
      4,
      5,
      "ellipsis",
      8,
    ]);
  });
});

describe("parsePage", () => {
  it("defaults to the first page", () => {
    expect(parsePage()).toEqual({ currentPage: 1, skip: 0 });
    expect(parsePage("")).toEqual({ currentPage: 1, skip: 0 });
  });

  it("parses a valid page into a skip offset", () => {
    expect(parsePage("2")).toEqual({ currentPage: 2, skip: 20 });
    expect(parsePage("3")).toEqual({ currentPage: 3, skip: 40 });
  });

  it("falls back to page one for invalid values", () => {
    expect(parsePage("0")).toEqual({ currentPage: 1, skip: 0 });
    expect(parsePage("-2")).toEqual({ currentPage: 1, skip: 0 });
    expect(parsePage("abc")).toEqual({ currentPage: 1, skip: 0 });
    expect(parsePage("2.5")).toEqual({ currentPage: 1, skip: 0 });
  });
});

describe("getTotalPages", () => {
  it("returns at least one page", () => {
    expect(getTotalPages(0)).toBe(1);
    expect(getTotalPages(20)).toBe(1);
    expect(getTotalPages(21)).toBe(2);
    expect(getTotalPages(100)).toBe(5);
  });
});
