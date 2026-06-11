import { defaultFormValues, dietTypes, recyclingHabits, transportModes } from "../data/options";

const allowedValues = {
  transportMode: transportModes.map((item) => item.value),
  dietType: dietTypes.map((item) => item.value),
  recyclingHabit: recyclingHabits.map((item) => item.value)
};

export function sanitizeNumber(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }
  return Math.min(parsed, 100000);
}

export function sanitizeCalculatorInput(input) {
  return {
    electricityKwh: sanitizeNumber(input.electricityKwh),
    travelKm: sanitizeNumber(input.travelKm),
    transportMode: allowedValues.transportMode.includes(input.transportMode)
      ? input.transportMode
      : defaultFormValues.transportMode,
    dietType: allowedValues.dietType.includes(input.dietType) ? input.dietType : defaultFormValues.dietType,
    recyclingHabit: allowedValues.recyclingHabit.includes(input.recyclingHabit)
      ? input.recyclingHabit
      : defaultFormValues.recyclingHabit
  };
}

export function validateCalculatorInput(input) {
  const errors = {};
  const electricity = Number(input.electricityKwh);
  const travel = Number(input.travelKm);

  if (input.electricityKwh === "" || !Number.isFinite(electricity) || electricity < 0) {
    errors.electricityKwh = "Enter a valid monthly electricity value of 0 or more.";
  }

  if (input.travelKm === "" || !Number.isFinite(travel) || travel < 0) {
    errors.travelKm = "Enter a valid weekly travel distance of 0 or more.";
  }

  if (!allowedValues.transportMode.includes(input.transportMode)) {
    errors.transportMode = "Choose a valid transport mode.";
  }

  if (!allowedValues.dietType.includes(input.dietType)) {
    errors.dietType = "Choose a valid diet type.";
  }

  if (!allowedValues.recyclingHabit.includes(input.recyclingHabit)) {
    errors.recyclingHabit = "Choose a valid recycling habit.";
  }

  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
