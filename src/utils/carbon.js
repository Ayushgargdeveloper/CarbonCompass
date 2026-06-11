import { dietTypes, emissionFactors, recyclingHabits, transportModes } from "../data/options";
import { sanitizeCalculatorInput } from "./validation";

function findByValue(collection, value) {
  return collection.find((item) => item.value === value) || collection[0];
}

export function roundOne(value) {
  return Math.round(value * 10) / 10;
}

export function calculateFootprint(input) {
  const safeInput = sanitizeCalculatorInput(input);
  const transportMode = findByValue(transportModes, safeInput.transportMode);
  const dietType = findByValue(dietTypes, safeInput.dietType);
  const recyclingHabit = findByValue(recyclingHabits, safeInput.recyclingHabit);

  const energy =
    (safeInput.electricityKwh * emissionFactors.electricityKgPerKwh) / emissionFactors.weeksPerMonth;
  const travel = safeInput.travelKm * transportMode.kgPerKm;
  const diet = dietType.weeklyKg;
  const recyclingCredit = recyclingHabit.weeklyCreditKg;
  const total = Math.max(energy + travel + diet - recyclingCredit, 0);

  return {
    input: safeInput,
    total: roundOne(total),
    breakdown: [
      { name: "Electricity", value: roundOne(energy) },
      { name: "Travel", value: roundOne(travel) },
      { name: "Diet", value: roundOne(diet) },
      { name: "Recycling credit", value: roundOne(-recyclingCredit) }
    ],
    summary: {
      energy: roundOne(energy),
      travel: roundOne(travel),
      diet: roundOne(diet),
      recyclingCredit: roundOne(recyclingCredit)
    }
  };
}
