import { useEffect, useState } from "react";

export default function EditHabitModal({ habit, onSave, onClose }) {
  const [name, setName] = useState(habit.name);
  const [category, setCategory] = useState(habit.category || "");

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSave({ name: trimmed, category: category.trim() || null });
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-habit-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="edit-habit-title">Edit habit</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="edit-habit-name">Habit</label>
            <input
              id="edit-habit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={80}
              autoFocus
            />
          </div>
          <div className="field">
            <label htmlFor="edit-habit-category">Category</label>
            <input
              id="edit-habit-category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              maxLength={40}
              placeholder="e.g. Health"
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
