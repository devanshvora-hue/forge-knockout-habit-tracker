import { todayISO, addDays } from "./dates.js";

// Daily-habit streak model: consecutive calendar days, ending today (or
// ending yesterday if today just hasn't been checked off yet), with a
// completed check-in on every one of those days. Any gap breaks it.
// referenceDate is injectable so this stays pure/testable without mocking
// the system clock.
export function computeStreak(completedDates, referenceDate = todayISO()) {
  if (!completedDates || completedDates.length === 0) return 0;

  const completed = new Set(completedDates);

  let cursor = completed.has(referenceDate)
    ? referenceDate
    : addDays(referenceDate, -1);

  if (!completed.has(cursor)) return 0;

  let streak = 0;
  while (completed.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}
