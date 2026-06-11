import { describe, expect, it } from "vitest";
import { calculateFootprint } from "../utils/carbon";
import { generateRecommendations } from "../utils/recommendations";

describe("generateRecommendations", () => {
  it("generates personalized tips for high-impact habits", () => {
    const input = {
      electricityKwh: 320,
      travelKm: 120,
      transportMode: "car",
      dietType: "high-meat",
      recyclingHabit: "never"
    };
    const tips = generateRecommendations(input, calculateFootprint(input));

    expect(tips.join(" ")).toMatch(/public transport/i);
    expect(tips.join(" ")).toMatch(/electricity/i);
    expect(tips.join(" ")).toMatch(/meat-free/i);
    expect(tips.join(" ")).toMatch(/Recycling/i);
  });

  it("returns a balanced-habits tip when no rule is triggered", () => {
    const input = {
      electricityKwh: 80,
      travelKm: 10,
      transportMode: "train",
      dietType: "vegetarian",
      recyclingHabit: "often"
    };

    expect(generateRecommendations(input, calculateFootprint(input))).toHaveLength(1);
  });
});
