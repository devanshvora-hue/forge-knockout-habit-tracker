import { useState } from "react";

const NAME_MAX_LENGTH = 80;
const CATEGORY_MAX_LENGTH = 40;

export default function AddHabitForm({ onAddHabit }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAddHabit({ name: trimmed, category: category.trim() || null });
    setName("");
    setCategory("");
  }

  return (
    <form className="add-habit-form" onSubmit={handleSubmit}>
      <div className="add-habit-fields">
        <div className="field">
          <label htmlFor="habit-name">Habit</label>
          <input
            id="habit-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={NAME_MAX_LENGTH}
            placeholder="e.g. Drink a glass of water"
            autoComplete="off"
          />
        </div>
        <div className="field field-category">
          <label htmlFor="habit-category">Category (optional)</label>
          <input
            id="habit-category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            maxLength={CATEGORY_MAX_LENGTH}
            placeholder="e.g. Health"
            autoComplete="off"
          />
        </div>
      </div>
      <button type="submit">Add habit</button>
    </form>
  );
}
