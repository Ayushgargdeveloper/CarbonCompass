import { describe, expect, it } from "vitest";
import { sanitizeCalculatorInput, validateCalculatorInput } from "../utils/validation";

describe("calculator validation", () => {
  it("returns errors for invalid number inputs", () => {
    const errors = validateCalculatorInput({
      electricityKwh: "-1",
      travelKm: "",
      transportMode: "car",
      dietType: "mixed",
      recyclingHabit: "often"
    });

    expect(errors.electricityKwh).toBeDefined();
    expect(errors.travelKm).toBeDefined();
  });

  it("sanitizes unsafe select values to defaults", () => {
    const sanitized = sanitizeCalculatorInput({
      electricityKwh: "100",
      travelKm: "25",
      transportMode: "spaceship",
      dietType: "unknown",
      recyclingHabit: "bad"
    });

    expect(sanitized.transportMode).toBe("car");
    expect(sanitized.dietType).toBe("mixed");
    expect(sanitized.recyclingHabit).toBe("sometimes");
  });
});
