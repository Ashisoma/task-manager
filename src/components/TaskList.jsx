import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../services/api';

const apiUrl = 'https://tasks-api-yq7g.onrender.com';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTasks();

        setTasks(data);
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
    axios.delete(`${apiUrl}/api/v1/tasks/${taskId}`)
      .then(() => {
        // Remove the deleted task from the tasks state
        setTasks(tasks.filter(task => task.id !== taskId));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
     <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Task List</h1>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="py-2">
              <Link to={`/task/${task.id}`}>
                <div className="p-4 border rounded-lg shadow-md hover:shadow-lg">
                  {task.title}
                </div>

              </Link>
              <button
                className="mt-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}

export default TaskList;
