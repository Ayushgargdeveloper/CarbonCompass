export function createFootprintRecord(total) {
  const savedAt = new Date();
  return {
    id: crypto.randomUUID(),
    date: savedAt.toISOString(),
    label: savedAt.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    total
  };
}
