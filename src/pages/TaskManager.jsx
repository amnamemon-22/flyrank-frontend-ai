import { useState } from "react";
import "../styles/taskManager.css";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function TaskManager() {
  const [tasks, setTasks] = useState([]);

  function addTask(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, completed: false },
    ]);
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <div className="task-manager">
      <header className="task-manager__header">
        <h1>Task Manager</h1>
        <p>Stay organized and get things done.</p>
      </header>

      <TaskForm onAddTask={addTask} />

      <TaskList
        tasks={tasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}

export default TaskManager;
