const RECORDS_KEY = "carbon-compass-records";
const ACTIONS_KEY = "carbon-compass-actions";
const memoryStore = new Map();

const fallbackStorage = {
  getItem: (key) => memoryStore.get(key) ?? null,
  setItem: (key, value) => memoryStore.set(key, value)
};

function safeParse(value, fallback) {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function getStorage(storage) {
  if (storage && typeof storage.getItem === "function" && typeof storage.setItem === "function") {
    return storage;
  }

  try {
    if (typeof window !== "undefined" && window.localStorage && typeof window.localStorage.getItem === "function") {
      return window.localStorage;
    }
  } catch {
    return fallbackStorage;
  }

  return fallbackStorage;
}

export function loadRecords(storage) {
  const activeStorage = getStorage(storage);
  const parsed = safeParse(activeStorage.getItem(RECORDS_KEY), []);
  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed.filter(
    (record) =>
      record &&
      typeof record.id === "string" &&
      typeof record.date === "string" &&
      Number.isFinite(record.total)
  );
}

export function saveRecord(record, storage) {
  const activeStorage = getStorage(storage);
  const records = loadRecords(activeStorage);
  const nextRecords = [...records, record].slice(-8);
  activeStorage.setItem(RECORDS_KEY, JSON.stringify(nextRecords));
  return nextRecords;
}

export function loadActionState(actionCount, storage) {
  const activeStorage = getStorage(storage);
  const parsed = safeParse(activeStorage.getItem(ACTIONS_KEY), {});
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(parsed)
      .filter(([key, value]) => Number(key) >= 0 && Number(key) < actionCount && typeof value === "boolean")
      .map(([key, value]) => [key, value])
  );
}

export function saveActionState(state, storage) {
  getStorage(storage).setItem(ACTIONS_KEY, JSON.stringify(state));
}

export function getProgressMessage(records) {
  if (records.length < 2) {
    return "Save at least two records to see progress.";
  }

  const previous = records[records.length - 2].total;
  const current = records[records.length - 1].total;
  const difference = Math.abs(current - previous).toFixed(1);

  if (current < previous) {
    return `Improved by ${difference} kg CO2e compared to your last record.`;
  }

  if (current > previous) {
    return `Increased by ${difference} kg CO2e compared to your last record.`;
  }

  return "No change compared to your last record.";
}
