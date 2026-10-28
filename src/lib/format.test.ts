import { describe, expect, it } from "vitest";
import { getDiscountedPrice } from "@/lib/format";

describe("getDiscountedPrice", () => {
  it("applies the discount and rounds to cents", () => {
    expect(getDiscountedPrice(100, 10)).toBe(90);
    expect(getDiscountedPrice(19.99, 10)).toBe(17.99);
    expect(getDiscountedPrice(10, 33.333)).toBe(6.67);
  });

  it("handles a zero discount and a zero price", () => {
    expect(getDiscountedPrice(25, 0)).toBe(25);
    expect(getDiscountedPrice(0, 50)).toBe(0);
  });
});
