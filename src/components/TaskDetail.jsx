import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";

function TaskDetails() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const apiUrl = "https://tasks-api-yq7g.onrender.com";

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        // Fetch the JWT token from local storage
        const jwtToken = localStorage.getItem('jwtToken');

        console.log('===details========');
        console.log(jwtToken);
        console.log(taskId);

        // Fetch the task details from the API using the taskId
        const response = await axios.get(`${apiUrl}/tasks/${taskId}`, {
          headers: {
            'Content-Type': 'application/json',
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
        console.error('Error fetching task details:', error.message);
        // Handle network errors or other exceptions
      }
    };

    fetchTaskDetails();
  }, [apiUrl, taskId]);

  const handleEdit = () => {
    setIsEditing(true);
  };
  // localStorage.removeItem('jwtToken');
  // const fetchTaskDetails = async (apiUrl, taskId, jwtToken, setTask, setEditedTitle, setEditedStatus, setEditedDescription) => {
  //   try {
  //     const response = await axios.get(`${apiUrl}/tasks/${taskId}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${jwtToken}`,
  //       },
  //     });

  //     // Handle the response data
  //     setTask(response.data);
  //     setEditedTitle(response.data.title);
  //     setEditedStatus(response.data.status);
  //     setEditedDescription(response.data.description);
  //   } catch (error) {
  //     console.error('Error fetching task details:', error.message);
  //   }
  // };

  // Call the function when needed, e.g., within a component or wherever you have access to apiUrl, taskId, and the state setters.
  const jwtToken = localStorage.getItem("jwtToken");
  console.log("===details========");
  console.log(jwtToken);
  console.log(taskId);

  // fetchTaskDetails(apiUrl, taskId, jwtToken, setTask, setEditedTitle, setEditedStatus, setEditedDescription);

  const handleSave = () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    };
    // Send a PUT request to update the task with edited properties
    axios
      .put(
        `${apiUrl}/tasks/${taskId}`,
        { headers },
        {
          title: editedTitle,
          status: editedStatus,
          description: editedDescription,
        }
      )
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error saving changes:", error);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      {task ? (
        <div>
          <h1 className="text-3xl font-semibold mb-4">Task Details</h1>
          {isEditing ? (
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <label>Status:</label>
              <input
                type="text"
                value={editedStatus}
                onChange={(e) => setEditedStatus(e.target.value)}
              />
              <label>Description:</label>
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div>
              <p>Task ID: {task._id}</p>
              <p>Title: {task.title}</p>
              <p>Status: {task.status}</p>
              <p>Description: {task.description}</p>
              <button onClick={handleEdit}>Edit</button>
            </div>
          )}
          <Link to="/tasks">Back to Task List</Link>
        </div>
      ) : (
        <p>Loading task details...</p>
      )}
    </div>
  );
}

export default TaskDetails;
