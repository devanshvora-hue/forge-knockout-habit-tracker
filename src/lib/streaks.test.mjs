import { test } from "node:test";
import assert from "node:assert/strict";
import { computeStreak } from "./streaks.js";

test("no check-ins means no streak", () => {
  assert.equal(computeStreak([], "2026-01-10"), 0);
});

test("counts consecutive days ending today", () => {
  // Mon -> Thu completed, reference date Thursday
  const dates = ["2026-01-05", "2026-01-06", "2026-01-07", "2026-01-08"];
  assert.equal(computeStreak(dates, "2026-01-08"), 4);
});

test("a missed day breaks the streak, restarting from the new completion", () => {
  // Mon-Thu completed, Fri missed, Sat completed. Reference date Saturday.
  const dates = [
    "2026-01-05",
    "2026-01-06",
    "2026-01-07",
    "2026-01-08",
    // Friday 2026-01-09 skipped
    "2026-01-10",
  ];
  assert.equal(computeStreak(dates, "2026-01-10"), 1);
});

test("streak still counts if today is not yet checked in, but yesterday was", () => {
  const dates = ["2026-01-07", "2026-01-08"];
  assert.equal(computeStreak(dates, "2026-01-09"), 2);
});

test("streak is 0 if neither today nor yesterday was completed", () => {
  const dates = ["2026-01-01"];
  assert.equal(computeStreak(dates, "2026-01-09"), 0);
});

test("duplicate dates in the input do not inflate the streak", () => {
  const dates = ["2026-01-08", "2026-01-08", "2026-01-07"];
  assert.equal(computeStreak(dates, "2026-01-08"), 2);
});

test("does not count a date after the reference date", () => {
  const dates = ["2026-01-08", "2026-01-09", "2026-01-10"];
  // Reference date is the 8th — the 9th/10th are "future" relative to it
  // and must not extend the streak backward from a later cursor.
  assert.equal(computeStreak(dates, "2026-01-08"), 1);
});
