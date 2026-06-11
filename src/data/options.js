export const transportModes = [
  { value: "car", label: "Car", kgPerKm: 0.192 },
  { value: "bike", label: "Motorbike", kgPerKm: 0.103 },
  { value: "bus", label: "Bus", kgPerKm: 0.082 },
  { value: "train", label: "Train", kgPerKm: 0.041 },
  { value: "walking", label: "Walking / Cycling", kgPerKm: 0 }
];

export const dietTypes = [
  { value: "vegan", label: "Vegan", weeklyKg: 10 },
  { value: "vegetarian", label: "Vegetarian", weeklyKg: 14 },
  { value: "mixed", label: "Mixed", weeklyKg: 22 },
  { value: "high-meat", label: "High-meat", weeklyKg: 34 }
];

export const recyclingHabits = [
  { value: "never", label: "Never", weeklyCreditKg: 0 },
  { value: "sometimes", label: "Sometimes", weeklyCreditKg: 1.5 },
  { value: "often", label: "Often", weeklyCreditKg: 3 }
];

export const ecoActions = [
  "Use public transport or carpool once this week",
  "Turn off standby devices every night",
  "Plan one meat-free day",
  "Carry a reusable bottle or bag",
  "Sort recyclables before disposal"
];

export const defaultFormValues = {
  electricityKwh: "",
  travelKm: "",
  transportMode: "car",
  dietType: "mixed",
  recyclingHabit: "sometimes"
};
