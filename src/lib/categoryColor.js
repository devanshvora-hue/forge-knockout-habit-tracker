// Deterministic (not stored) color per category name so the same category
// always renders the same color without adding a color field to the data model.
const PALETTE = [
  { bg: "#e7f3ec", text: "#2f6f4f" }, // green
  { bg: "#e8f0fb", text: "#2f5f9e" }, // blue
  { bg: "#f1ecfa", text: "#6b4fa0" }, // purple
  { bg: "#fbe9e3", text: "#b1502f" }, // terracotta
  { bg: "#e2f5f2", text: "#1f7a6c" }, // teal
  { bg: "#faf1d9", text: "#9c7a12" }, // mustard
];

export function getCategoryColor(category) {
  if (!category) return PALETTE[0];
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = (hash * 31 + category.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}
