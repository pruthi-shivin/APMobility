function TaskItem({
  task,
  deleteTask,
  toggleComplete,
  setEditingTask,
}) {
  return (
    <div className="task-item">
      <div className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task)}
        />

        <p className={task.completed ? "completed" : ""}>
          {task.title}
        </p>
      </div>

      <div className="task-buttons">
        <button
          className="edit-btn"
          onClick={() => setEditingTask(task)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;