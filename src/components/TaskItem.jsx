function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item${task.completed ? " task-item--completed" : ""}`}>
      <label className="task-item__label">
        <input
          type="checkbox"
          className="task-item__checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark "${task.text}" as ${task.completed ? "incomplete" : "complete"}`}
        />
        <span className="task-item__text">{task.text}</span>
      </label>
      <button
        type="button"
        className="task-item__delete"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete "${task.text}"`}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
