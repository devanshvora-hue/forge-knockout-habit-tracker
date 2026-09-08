import HabitRow from "./HabitRow.jsx";

export default function HabitList({
  habits,
  archivedHabits,
  checkIns,
  onToggleToday,
  onEdit,
  onDelete,
  onArchiveToggle,
}) {
  const isFullyEmpty = habits.length === 0 && archivedHabits.length === 0;

  if (isFullyEmpty) {
    return (
      <div className="empty-state">
        <p className="empty-state-title">Start building your routine.</p>
        <p className="empty-state-subtitle">
          Add your first habit above to begin tracking streaks.
        </p>
        <button
          type="button"
          className="empty-state-cta"
          onClick={() => document.getElementById("habit-name")?.focus()}
        >
          Create your first habit
        </button>
      </div>
    );
  }

  return (
    <>
      {habits.length === 0 ? (
        <p className="empty-state-inline">
          All habits are archived. Unarchive one below to keep tracking.
        </p>
      ) : (
        <ul className="habit-list">
          {habits.map((habit) => (
            <HabitRow
              key={habit.id}
              habit={habit}
              checkIns={checkIns}
              onToggleToday={onToggleToday}
              onEdit={onEdit}
              onDelete={onDelete}
              onArchiveToggle={onArchiveToggle}
            />
          ))}
        </ul>
      )}

      {archivedHabits.length > 0 && (
        <details className="archived-section">
          <summary>Archived ({archivedHabits.length})</summary>
          <ul className="habit-list habit-list-archived">
            {archivedHabits.map((habit) => (
              <HabitRow
                key={habit.id}
                habit={habit}
                checkIns={checkIns}
                onToggleToday={onToggleToday}
                onEdit={onEdit}
                onDelete={onDelete}
                onArchiveToggle={onArchiveToggle}
                archived
              />
            ))}
          </ul>
        </details>
      )}
    </>
  );
}
