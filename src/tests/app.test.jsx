import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("App", () => {
  it("renders the Phase 1 dashboard with accessible calculator fields", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /carbon compass/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/monthly electricity usage/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/weekly travel distance/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /calculate footprint/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save current result/i })).toBeInTheDocument();
  });

  it("blocks invalid negative input and shows accessible errors", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/monthly electricity usage/i), { target: { value: "-10" } });
    fireEvent.change(screen.getByLabelText(/weekly travel distance/i), { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: /calculate footprint/i }));

    expect(screen.getByLabelText(/monthly electricity usage/i)).toHaveValue(0);
    expect(screen.getByText(/valid weekly travel distance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/weekly travel distance/i)).toHaveAttribute("aria-invalid", "true");
  });
});
