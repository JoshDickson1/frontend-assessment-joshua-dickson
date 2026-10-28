import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Pagination } from "@/components/Pagination/Pagination";

describe("Pagination", () => {
  it("renders nothing for a single page", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("marks the current page and disables Previous on the first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        q="lip"
        category="beauty"
      />,
    );

    expect(screen.getByText("1")).toHaveAttribute("aria-current", "page");
    expect(
      screen.queryByRole("link", { name: "Previous" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute(
      "href",
      "/?q=lip&category=beauty&page=2",
    );
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
      "href",
      "/?q=lip&category=beauty&page=2",
    );
    expect(screen.getByRole("link", { name: "10" })).toHaveAttribute(
      "href",
      "/?q=lip&category=beauty&page=10",
    );
  });

  it("preserves filters and links to adjacent pages from the middle", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        q="lip"
        category="beauty"
      />,
    );

    expect(screen.getAllByText("…")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute(
      "href",
      "/?q=lip&category=beauty&page=4",
    );
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute(
      "href",
      "/?q=lip&category=beauty&page=6",
    );
    expect(screen.getByText("5")).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "4" })).toHaveAttribute(
      "href",
      "/?q=lip&category=beauty&page=4",
    );
    expect(screen.getByRole("link", { name: "6" })).toHaveAttribute(
      "href",
      "/?q=lip&category=beauty&page=6",
    );
  });

  it("disables Next on the last page", () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        q="lip"
        category="beauty"
      />,
    );

    expect(
      screen.queryByRole("link", { name: "Next" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute(
      "href",
      "/?q=lip&category=beauty&page=9",
    );
    expect(screen.getByText("10")).toHaveAttribute("aria-current", "page");
  });

  it("omits query params when filters are absent", () => {
    render(<Pagination currentPage={2} totalPages={3} />);

    expect(screen.getByRole("link", { name: "1" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "3" })).toHaveAttribute(
      "href",
      "/?page=3",
    );
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute(
      "href",
      "/?page=3",
    );
  });
});
