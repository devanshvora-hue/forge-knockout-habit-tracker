const HABITS_KEY = "habit-tracker:habits:v2";
const CHECKINS_KEY = "habit-tracker:checkins:v2";
const LEGACY_HABITS_KEY = "habit-tracker:habits";

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage unavailable (e.g. private browsing) — app still works for this session
  }
}

// One-time, non-destructive upgrade from the old shape
// ({ id, name, createdAt, checkIns: [date, ...] }) to the split
// habits/checkins model. The legacy key is left in place untouched.
function migrateLegacyData() {
  const legacy = readJSON(LEGACY_HABITS_KEY, null);
  if (!legacy || !Array.isArray(legacy)) return null;

  const habits = legacy.map((h) => ({
    id: h.id,
    name: h.name,
    description: "",
    category: null,
    frequency: { type: "daily" },
    active: true,
    createdAt: h.createdAt,
    updatedAt: h.createdAt,
  }));

  const checkIns = legacy.flatMap((h) =>
    (h.checkIns || []).map((date) => ({
      id: crypto.randomUUID(),
      habitId: h.id,
      date,
      completed: true,
      createdAt: date,
    })),
  );

  return { habits, checkIns };
}

export function loadData() {
  const existingHabits = readJSON(HABITS_KEY, null);
  if (existingHabits) {
    return {
      habits: existingHabits,
      checkIns: readJSON(CHECKINS_KEY, []),
    };
  }

  const migrated = migrateLegacyData();
  if (migrated) {
    writeJSON(HABITS_KEY, migrated.habits);
    writeJSON(CHECKINS_KEY, migrated.checkIns);
    return migrated;
  }

  return { habits: [], checkIns: [] };
}

export function saveHabits(habits) {
  writeJSON(HABITS_KEY, habits);
}

export function saveCheckIns(checkIns) {
  writeJSON(CHECKINS_KEY, checkIns);
}
