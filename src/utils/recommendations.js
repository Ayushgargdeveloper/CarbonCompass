export function generateRecommendations(input, result) {
  const tips = [];

  if (input.transportMode === "car" && input.travelKm >= 80) {
    tips.push(
      "Your car travel is high. Try replacing one or two trips with public transport, carpooling, walking, or cycling."
    );
  }

  if (input.electricityKwh >= 250) {
    tips.push(
      "Your electricity use is high. Reduce standby power, use efficient lighting, and run heavy appliances in batches."
    );
  }

  if (input.dietType === "high-meat") {
    tips.push("High-meat diets have a larger footprint. Start with one meat-free day each week.");
  }

  if (input.recyclingHabit === "never") {
    tips.push("Recycling is currently low. Set up separate bins for paper, plastic, metal, and e-waste.");
  }

  if (tips.length === 0 && result.total > 0) {
    tips.push(
      "Your habits are already balanced. Keep tracking weekly and focus on the category with the highest emissions."
    );
  }

  return tips;
}
