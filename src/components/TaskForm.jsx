import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onAddTask(trimmed);
    setText("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-form__input"
        placeholder="What needs to be done?"
        value={text}
        onChange={(event) => setText(event.target.value)}
        aria-label="New task"
      />
      <button type="submit" className="task-form__button">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
