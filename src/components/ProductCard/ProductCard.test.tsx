import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import type { Product } from "@/types/product";

const product: Product = {
  id: 7,
  title: "Essence Mascara Lash Princess",
  description: "A volumizing mascara.",
  category: "beauty",
  price: 9.99,
  discountPercentage: 10,
  rating: 4.5,
  stock: 12,
  thumbnail: "https://cdn.dummyjson.com/product-images/beauty/essence.jpg",
  images: [],
  tags: ["beauty", "mascara"],
};

describe("ProductCard", () => {
  it("shows product details and links to the detail page", () => {
    render(<ProductCard product={product} />);

    expect(
      screen.getByRole("heading", { name: product.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("$9.99")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/items/7",
    );
    expect(screen.getByAltText(product.title)).toBeInTheDocument();
  });

  it("renders the fallback when the image fails twice", () => {
    render(<ProductCard product={product} />);

    const image = screen.getByAltText(product.title);

    fireEvent.error(image);
    fireEvent.error(image);

    expect(screen.getByText("Image unavailable")).toBeInTheDocument();
  });

  it("only animates cards in the second row", () => {
    const { container, rerender } = render(
      <ProductCard product={product} index={0} />,
    );

    expect(container.firstChild).not.toHaveClass(
      "animate-[card-in_320ms_ease-out_both]",
    );

    rerender(<ProductCard product={product} index={4} />);

    expect(container.firstChild).toHaveClass(
      "animate-[card-in_320ms_ease-out_both]",
    );

    rerender(<ProductCard product={product} index={8} />);

    expect(container.firstChild).not.toHaveClass(
      "animate-[card-in_320ms_ease-out_both]",
    );
  });
});
