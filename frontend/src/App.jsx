import { useEffect, useState } from "react";
import API from "./services/api";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (title) => {
    const res = await API.post("/", { title });

    setTasks([res.data, ...tasks]);
  };

  const deleteTask = async (id) => {
    await API.delete(`/${id}`);

    setTasks(tasks.filter((task) => task._id !== id));
  };

  const toggleComplete = async (task) => {
    const res = await API.put(`/${task._id}`, {
      completed: !task.completed,
    });

    setTasks(
      tasks.map((t) => (t._id === task._id ? res.data : t))
    );
  };

  const updateTask = async (title) => {
    const res = await API.put(`/${editingTask._id}`, {
      title,
    });

    setTasks(
      tasks.map((task) =>
        task._id === editingTask._id ? res.data : task
      )
    );

    setEditingTask(null);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Task Manager</h1>

        <TaskForm
          addTask={addTask}
          editingTask={editingTask}
          updateTask={updateTask}
        />

        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          setEditingTask={setEditingTask}
        />
      </div>
    </div>
  );
}

export default App;