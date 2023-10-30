import React, { useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import axios from "axios";

function NewTask() {
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: false,
  });

  const apiUrl = "https://tasks-api-yq7g.onrender.com/tasks";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jwtToken = localStorage.getItem("jwtToken");
    console.log(jwtToken);

    const headers = {
      "Content-Type": "application/json",
      authorization: `${jwtToken}`,
    };

    // Send a POST request to create a new task
    axios
      .post(apiUrl, newTask, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("jwtToken")}`, // Add JWT token from local storage
        },
      })
      .then((response) => {
        console.log(response.data);
        // Redirect to the task list page after successfully adding a new task
        navigate("/tasks");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Add New Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Status:
          </label>
          <select
            name="status"
            value={newTask.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          >
            <option value={false}>Incomplete</option>
            <option value={true}>Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default NewTask;
