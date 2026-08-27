import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, cardStyles } from "./Card";

describe("cardStyles", () => {
  it("defaults to the cream variant, md size, and the rounded base shape", () => {
    const styles = cardStyles();
    expect(styles).toContain("rounded-3xl");
    expect(styles).toContain("bg-cream");
    expect(styles).toContain("text-navy");
    expect(styles).toContain("p-6");
  });

  it("maps each variant to its background/text pair", () => {
    expect(cardStyles({ variant: "sky" })).toContain("bg-sky");
    expect(cardStyles({ variant: "sky" })).toContain("text-navy");

    expect(cardStyles({ variant: "butter" })).toContain("bg-butter");
    expect(cardStyles({ variant: "butter" })).toContain("text-navy");

    expect(cardStyles({ variant: "navy" })).toContain("bg-navy");
    expect(cardStyles({ variant: "navy" })).toContain("text-cream");
  });

  it("maps each size to its padding scale", () => {
    expect(cardStyles({ size: "sm" })).toContain("p-4");
    expect(cardStyles({ size: "md" })).toContain("p-6");
    expect(cardStyles({ size: "lg" })).toContain("p-8");
  });

  it("merges a custom className and lets it override conflicting utilities", () => {
    const styles = cardStyles({ size: "md", className: "p-10" });
    expect(styles).toContain("p-10");
    expect(styles).not.toContain("p-6");
  });
});

describe("Card", () => {
  it("renders a div by default", () => {
    render(<Card data-testid="card">hello</Card>);
    const el = screen.getByTestId("card");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveTextContent("hello");
  });

  it("applies variant and size classes to the rendered element", () => {
    render(
      <Card data-testid="card" variant="navy" size="lg">
        content
      </Card>
    );
    const el = screen.getByTestId("card");
    expect(el).toHaveClass("bg-navy", "text-cream", "p-8", "rounded-3xl");
  });

  it("renders a link when href is provided", () => {
    render(
      <Card href="/events" data-testid="card">
        go to events
      </Card>
    );
    const el = screen.getByTestId("card");
    expect(el.tagName).toBe("A");
    expect(el).toHaveAttribute("href", "/events");
  });

  it("passes through extra props to the underlying element", () => {
    render(
      <Card data-testid="card" aria-label="stat card">
        42
      </Card>
    );
    expect(screen.getByTestId("card")).toHaveAttribute(
      "aria-label",
      "stat card"
    );
  });

  it("merges a custom className onto the div branch", () => {
    render(
      <Card data-testid="card" className="custom-class">
        content
      </Card>
    );
    expect(screen.getByTestId("card")).toHaveClass("custom-class");
  });
});
