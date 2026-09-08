import { todayISO, isFutureISO } from "./dates.js";

export function getCheckIn(checkIns, habitId, date) {
  return checkIns.find((c) => c.habitId === habitId && c.date === date);
}

export function isCompletedOn(checkIns, habitId, date) {
  const entry = getCheckIn(checkIns, habitId, date);
  return !!entry && entry.completed;
}

// One CheckIn row per (habitId, date): a second toggle flips `completed`
// rather than inserting a duplicate row, so a habit+date pair can never
// have more than one recorded check-in.
export function toggleCheckIn(checkIns, habitId, date = todayISO()) {
  if (isFutureISO(date)) return checkIns;

  const existing = getCheckIn(checkIns, habitId, date);
  if (existing) {
    return checkIns.map((c) =>
      c.id === existing.id ? { ...c, completed: !c.completed } : c,
    );
  }

  return [
    ...checkIns,
    {
      id: crypto.randomUUID(),
      habitId,
      date,
      completed: true,
      createdAt: todayISO(),
    },
  ];
}

export function completedDatesForHabit(checkIns, habitId) {
  return checkIns
    .filter((c) => c.habitId === habitId && c.completed)
    .map((c) => c.date);
}

export function deleteCheckInsForHabit(checkIns, habitId) {
  return checkIns.filter((c) => c.habitId !== habitId);
}
