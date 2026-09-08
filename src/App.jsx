import { useEffect, useState } from "react";
import AddHabitForm from "./components/AddHabitForm.jsx";
import HabitList from "./components/HabitList.jsx";
import EditHabitModal from "./components/EditHabitModal.jsx";
import { loadData, saveHabits, saveCheckIns } from "./lib/storage.js";
import { todayISO, formatDisplayDate } from "./lib/dates.js";
import {
  toggleCheckIn as toggleCheckInEntry,
  deleteCheckInsForHabit,
} from "./lib/checkins.js";

export default function App() {
  const [habits, setHabits] = useState(() => loadData().habits);
  const [checkIns, setCheckIns] = useState(() => loadData().checkIns);
  const [editingHabit, setEditingHabit] = useState(null);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  useEffect(() => {
    saveCheckIns(checkIns);
  }, [checkIns]);

  function handleAddHabit({ name, category }) {
    const now = todayISO();
    const newHabit = {
      id: crypto.randomUUID(),
      name,
      description: "",
      category: category || null,
      frequency: { type: "daily" },
      active: true,
      createdAt: now,
      updatedAt: now,
    };
    setHabits((prev) => [...prev, newHabit]);
  }

  function handleToggleToday(habitId) {
    setCheckIns((prev) => toggleCheckInEntry(prev, habitId, todayISO()));
  }

  function handleDelete(habitId) {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
    setCheckIns((prev) => deleteCheckInsForHabit(prev, habitId));
    setEditingHabit((prev) => (prev?.id === habitId ? null : prev));
  }

  function handleArchiveToggle(habitId) {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === habitId
          ? { ...h, active: !h.active, updatedAt: todayISO() }
          : h,
      ),
    );
  }

  function handleSaveEdit(updates) {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === editingHabit.id
          ? { ...h, ...updates, updatedAt: todayISO() }
          : h,
      ),
    );
    setEditingHabit(null);
  }

  const activeHabits = habits.filter((h) => h.active);
  const archivedHabits = habits.filter((h) => !h.active);

  return (
    <main className="app">
      <h1>Today</h1>
      <p className="app-subtitle">{formatDisplayDate()}</p>
      <AddHabitForm onAddHabit={handleAddHabit} />
      <HabitList
        habits={activeHabits}
        archivedHabits={archivedHabits}
        checkIns={checkIns}
        onToggleToday={handleToggleToday}
        onEdit={setEditingHabit}
        onDelete={handleDelete}
        onArchiveToggle={handleArchiveToggle}
      />
      {editingHabit && (
        <EditHabitModal
          habit={editingHabit}
          onSave={handleSaveEdit}
          onClose={() => setEditingHabit(null)}
        />
      )}
    </main>
  );
}
