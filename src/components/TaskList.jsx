import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios
import { fetchTasks } from "../services/api";

const apiUrl = "https://tasks-api-yq7g.onrender.com";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTasks();

        setTasks(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        // Handle error
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteTask = (taskId) => {
    // Retrieve the JWT token from local storage
    const jwtToken = localStorage.getItem("jwtToken");

    // Include the JWT token in the request headers
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwtToken}`,
    };

    axios
      .delete(`${apiUrl}/tasks/${taskId}`, { headers })
      .then(() => {
        // Remove the deleted task from the tasks state
        setTasks(tasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.error("Error deleting task:", error.message);
      });
  };

  return (
    <div className="bg-white-200 min-h-screen">
      <div className="container mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">Task List</h1>
          <Link to="/tasks/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add New Task
          </Link>
        </div>
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {tasks.map((task) => (
              <div key={task._id} className="py-2">
                <Link to={`/tasks/${task._id}`}>
                  <div className="p-4 border rounded-lg shadow-md hover:shadow-lg">
                    <h2 className="font-bold">{task.title}</h2>
                    <div>
                      <br />
                  
                      <br />{task.description}
                      <p><strong>Status:</strong> {task.status ? "Completed" : "Incomplete"}</p>                    
                      </div>
                    <p>
                    </p>
                    
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

    
      </div>
    </div>
  );
}

export default TaskList;
