import { useEffect, useState } from "react";
import API from "./services/api";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await API.get("/");

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (title) => {
    try {
      const res = await API.post("/", { title });

      setTasks([res.data, ...tasks]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/${id}`);

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const res = await API.put(`/${task._id}`, {
        completed: !task.completed,
      });

      setTasks(
        tasks.map((t) => (t._id === task._id ? res.data : t))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (title) => {
    try {
      const res = await API.put(`/${editingTask._id}`, {
        title,
      });

      setTasks(
        tasks.map((task) =>
          task._id === editingTask._id ? res.data : task
        )
      );

      setEditingTask(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="container">
          <h2 style={{ textAlign: "center" }}>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Task Manager</h1>

        <p className="task-count">
          Total Tasks: {tasks.length}
        </p>

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