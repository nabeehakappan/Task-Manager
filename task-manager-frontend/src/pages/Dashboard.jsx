import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get("https://taskly-a70p.onrender.com/api/tasks", {
      headers: { Authorization: token },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    await axios.post(
      "https://taskly-a70p.onrender.com/api/tasks",
      { title },
      { headers: { Authorization: token } }
    );
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://taskly-a70p.onrender.com/api/tasks/${id}`, {
      headers: { Authorization: token },
    });
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await axios.put(
      `https://taskly-a70p.onrender.com/api/tasks/${task._id}`,
      { completed: !task.completed },
      { headers: { Authorization: token } }
    );
    fetchTasks();
  };
  const editTask = async (task) => {
  const newTitle = prompt("Edit task:", task.title);
  if (!newTitle) return;

  await axios.put(
    `https://taskly-a70p.onrender.com/api/tasks/${task._id}`,
    { title: newTitle },
    { headers: { Authorization: token } }
  );

  fetchTasks();
};
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes(search.toLowerCase())
);
return (
    <div>
    <h1 className="app-title">Taskly</h1>
  <div className="container">
    <h2>Dashboard</h2>

    <input
      placeholder="New Task"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <div className="button-group">
    <button onClick={addTask}>Add</button>
    <input
  type="text"
  placeholder="Search tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
     <button onClick={logout}>Logout</button>
    </div>

    {filteredTasks.map((task) => (
      <div key={task._id} className="task">
        <span
          onClick={() => toggleTask(task)}
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            cursor: "pointer",
          }}
        >
          {task.title}
        </span>

        <button onClick={() => deleteTask(task._id)}>
          Delete
        </button>
        <button onClick={() => editTask(task)}>Edit</button>

      </div>
      
    ))}
   
  </div>
  </div>
);
}

export default Dashboard;
