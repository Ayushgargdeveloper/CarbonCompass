import { describe, expect, it } from "vitest";
import { getProgressMessage, loadActionState, loadRecords, saveActionState, saveRecord } from "../utils/storage";

function createStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value)
  };
}

describe("localStorage helpers", () => {
  it("handles invalid saved records safely", () => {
    const storage = createStorage({ "carbon-compass-records": "{bad json" });
    expect(loadRecords(storage)).toEqual([]);
  });

  it("saves and loads valid footprint records", () => {
    const storage = createStorage();
    const record = { id: "1", date: "2026-06-11T00:00:00.000Z", label: "Jun 11", total: 42.5 };

    saveRecord(record, storage);
    expect(loadRecords(storage)).toEqual([record]);
  });

  it("saves and filters action checklist state", () => {
    const storage = createStorage();
    saveActionState({ 0: true, 1: false, unsafe: "yes" }, storage);

    expect(loadActionState(2, storage)).toEqual({ 0: true, 1: false });
  });

  it("reports progress direction", () => {
    expect(
      getProgressMessage([
        { id: "1", date: "a", label: "A", total: 50 },
        { id: "2", date: "b", label: "B", total: 45 }
      ])
    ).toContain("Improved");
  });
});
