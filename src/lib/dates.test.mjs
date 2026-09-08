import { test } from "node:test";
import assert from "node:assert/strict";
import { addDays, compareISO, isFutureISO, toISO, parseISO } from "./dates.js";

test("addDays crosses a month boundary", () => {
  assert.equal(addDays("2026-01-31", 1), "2026-02-01");
});

test("addDays crosses a year boundary", () => {
  assert.equal(addDays("2025-12-31", 1), "2026-01-01");
});

test("addDays supports negative deltas", () => {
  assert.equal(addDays("2026-03-01", -1), "2026-02-28");
});

test("compareISO orders dates correctly", () => {
  assert.equal(compareISO("2026-01-01", "2026-01-02"), -1);
  assert.equal(compareISO("2026-01-02", "2026-01-01"), 1);
  assert.equal(compareISO("2026-01-01", "2026-01-01"), 0);
});

test("isFutureISO flags dates after the reference date", () => {
  assert.equal(isFutureISO("2026-01-05", "2026-01-04"), true);
  assert.equal(isFutureISO("2026-01-03", "2026-01-04"), false);
  assert.equal(isFutureISO("2026-01-04", "2026-01-04"), false);
});

test("toISO/parseISO round-trip", () => {
  assert.equal(toISO(parseISO("2026-07-04")), "2026-07-04");
});
