import { todayISO } from "../lib/dates.js";
import { completedDatesForHabit, isCompletedOn } from "../lib/checkins.js";
import { computeStreak } from "../lib/streaks.js";
import { getCategoryColor } from "../lib/categoryColor.js";

export default function HabitRow({
  habit,
  checkIns,
  onToggleToday,
  onEdit,
  onDelete,
  onArchiveToggle,
  archived = false,
}) {
  const today = todayISO();
  const done = isCompletedOn(checkIns, habit.id, today);
  const streak = computeStreak(completedDatesForHabit(checkIns, habit.id));
  const categoryColor = habit.category ? getCategoryColor(habit.category) : null;

  return (
    <li className={archived ? "habit-row habit-row-archived" : "habit-row"}>
      <button
        type="button"
        className="habit-check"
        aria-pressed={done}
        onClick={() => onToggleToday(habit.id)}
        disabled={archived}
      >
        <span className="habit-check-icon" aria-hidden="true">
          {done ? "✓" : ""}
        </span>
        <span className="habit-main">
          <span className={done ? "habit-name habit-name-done" : "habit-name"}>
            {habit.name}
          </span>
          <span className="habit-meta">
            {habit.category && (
              <span
                className="habit-category-pill"
                style={{
                  "--cat-bg": categoryColor.bg,
                  "--cat-text": categoryColor.text,
                }}
              >
                {habit.category}
              </span>
            )}
            {streak > 0 ? (
              <span className="streak-badge streak-badge-active">
                <span aria-hidden="true">🔥</span>
                {streak} day{streak === 1 ? "" : "s"}
              </span>
            ) : (
              <span className="streak-badge">Start today</span>
            )}
          </span>
        </span>
      </button>
      <div className="habit-actions">
        <button
          type="button"
          className="habit-action habit-action-edit"
          aria-label={`Edit ${habit.name}`}
          onClick={() => onEdit(habit)}
        >
          ✎
        </button>
        <button
          type="button"
          className="habit-action habit-action-archive"
          aria-label={archived ? `Unarchive ${habit.name}` : `Archive ${habit.name}`}
          onClick={() => onArchiveToggle(habit.id)}
        >
          {archived ? "↺" : "⏸"}
        </button>
        <button
          type="button"
          className="habit-delete"
          aria-label={`Delete ${habit.name}`}
          onClick={() => onDelete(habit.id)}
        >
          ×
        </button>
      </div>
    </li>
  );
}
