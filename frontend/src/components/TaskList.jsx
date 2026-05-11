import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  deleteTask,
  toggleComplete,
  setEditingTask,
}) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks found</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          setEditingTask={setEditingTask}
        />
      ))}
    </div>
  );
}

export default TaskList;