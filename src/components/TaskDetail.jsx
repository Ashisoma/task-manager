import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory, useNavigate } from "react-router-dom";
import axios from "axios";

function TaskDetails() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedStatus, setEditedStatus] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");

  const apiUrl = "https://tasks-api-yq7g.onrender.com";

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        // Fetch the JWT token from local storage
        const jwtToken = localStorage.getItem("jwtToken");

        // Fetch the task details from the API using the taskId
        const response = await axios.get(`${apiUrl}/tasks/${taskId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${jwtToken}`,
          },
        });

        if (response.status === 200) {
          setTask(response.data);
          setEditedTitle(response.data.title);
          setEditedStatus(response.data.status);
          setEditedDescription(response.data.description);
        } else if (response.status === 401) {
          console.log(response);
          // Handle unauthorized access (e.g., redirect to login)
        } else {
          console.log(response);
          // Handle other errors as needed
        }
      } catch (error) {
        console.error("Error fetching task details:", error.message);
      }
    };

    fetchTaskDetails();
  }, [apiUrl, taskId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `${jwtToken}`,
    };

    // Send a PUT request to update the task with edited properties
    axios
      .put(
        `${apiUrl}/tasks/${taskId}`,
        {
          title: editedTitle,
          status: editedStatus,
          description: editedDescription,
        },
        { headers }
      )
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error saving changes:", error);
      });
  };

  const handleDelete = () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `${jwtToken}`,
    };

    // Send a DELETE request to delete the task
    axios
      .delete(`${apiUrl}/tasks/${taskId}`, { headers })
      .then(() => {
        // Handle successful deletion
        navigate('/tasks')
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
    {task ? (
      <div>
        <h1 className="text-3xl font-semibold mb-4">Task Details</h1>
        {isEditing ? (
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            <label className="block text-gray-700 text-sm font-bold mt-3 mb-2">Status:</label>
            <input
              type="text"
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            <label className="block text-gray-700 text-sm font-bold mt-3 mb-2">Description:</label>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-2">Task ID: {task._id}</p>
            <p className="mb-2">Title: {task.title}</p>
            <p className="mb-2">Status: {task.status ? "Completed" : "Incomplete"}</p>
            <p className="mb-2">Description: {task.description}</p>
            <p className="mb-2">Created at: {formatDate(task.createdAt)}</p>
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </div>
        )}
        <Link to="/tasks" className="pt-5 mt-4 text-blue-500 hover:underline">
          Back to Task List
        </Link>
      </div>
    ) : (
      <p>Loading task details...</p>
    )}
  </div>
  );
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default TaskDetails;
