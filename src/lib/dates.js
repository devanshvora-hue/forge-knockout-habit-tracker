export function todayISO() {
  return toISO(new Date());
}

export function toISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseISO(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(iso, delta) {
  const date = parseISO(iso);
  date.setDate(date.getDate() + delta);
  return toISO(date);
}

export function compareISO(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export function isFutureISO(iso, referenceDate = todayISO()) {
  return compareISO(iso, referenceDate) > 0;
}
