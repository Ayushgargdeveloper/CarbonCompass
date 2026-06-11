import { describe, expect, it } from "vitest";
import { calculateFootprint } from "../utils/carbon";

describe("calculateFootprint", () => {
  it("calculates a category-wise carbon footprint", () => {
    const result = calculateFootprint({
      electricityKwh: 300,
      travelKm: 120,
      transportMode: "car",
      dietType: "high-meat",
      recyclingHabit: "never"
    });

    expect(result.total).toBeGreaterThan(0);
    expect(result.breakdown).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Electricity" }),
        expect.objectContaining({ name: "Travel" }),
        expect.objectContaining({ name: "Diet" })
      ])
    );
  });

  it("sanitizes negative numbers before calculating", () => {
    const result = calculateFootprint({
      electricityKwh: -10,
      travelKm: -20,
      transportMode: "walking",
      dietType: "vegan",
      recyclingHabit: "often"
    });

    expect(result.summary.energy).toBe(0);
    expect(result.summary.travel).toBe(0);
    expect(result.total).toBe(7);
  });
});
