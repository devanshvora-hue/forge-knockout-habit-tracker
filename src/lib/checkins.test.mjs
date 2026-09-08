import { test } from "node:test";
import assert from "node:assert/strict";
import {
  toggleCheckIn,
  isCompletedOn,
  completedDatesForHabit,
  deleteCheckInsForHabit,
} from "./checkins.js";

test("toggling a habit with no prior check-in creates one, completed", () => {
  const result = toggleCheckIn([], "habit-1", "2026-01-08");
  assert.equal(result.length, 1);
  assert.equal(isCompletedOn(result, "habit-1", "2026-01-08"), true);
});

test("toggling twice flips completed back to false, without adding a second row", () => {
  let checkIns = toggleCheckIn([], "habit-1", "2026-01-08");
  checkIns = toggleCheckIn(checkIns, "habit-1", "2026-01-08");
  assert.equal(checkIns.length, 1);
  assert.equal(isCompletedOn(checkIns, "habit-1", "2026-01-08"), false);
});

test("a future date is refused", () => {
  const result = toggleCheckIn([], "habit-1", "2999-01-01");
  assert.equal(result.length, 0);
});

test("completedDatesForHabit only returns completed dates for that habit", () => {
  let checkIns = toggleCheckIn([], "habit-1", "2026-01-08");
  checkIns = toggleCheckIn(checkIns, "habit-2", "2026-01-08");
  checkIns = toggleCheckIn(checkIns, "habit-1", "2026-01-07");
  assert.deepEqual(
    completedDatesForHabit(checkIns, "habit-1").sort(),
    ["2026-01-07", "2026-01-08"],
  );
});

test("deleteCheckInsForHabit removes only that habit's rows", () => {
  let checkIns = toggleCheckIn([], "habit-1", "2026-01-08");
  checkIns = toggleCheckIn(checkIns, "habit-2", "2026-01-08");
  const remaining = deleteCheckInsForHabit(checkIns, "habit-1");
  assert.equal(remaining.length, 1);
  assert.equal(remaining[0].habitId, "habit-2");
});
