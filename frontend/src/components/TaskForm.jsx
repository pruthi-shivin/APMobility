import { useEffect, useState } from "react";

function TaskForm({ addTask, editingTask, updateTask }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
        alert("Task cannot be empty");
        return;
    }

    if (editingTask) {
      updateTask(title);
    } else {
      addTask(title);
    }

    setTitle("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit">
        {editingTask ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default TaskForm;