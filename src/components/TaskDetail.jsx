import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function TaskDetails() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedStatus, setEditedStatus] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const apiUrl = 'https://tasks-api-yq7g.onrender.com'; // Replace with the actual API endpoint
  const history = useHistory();

  useEffect(() => {
    // Fetch the task details from the API using the taskId
    axios.get(`${apiUrl}/${taskId}`)
      .then((response) => {
        setTask(response.data);
        setEditedTitle(response.data.title);
        setEditedStatus(response.data.status);
        setEditedDescription(response.data.description);
      })
      .catch((error) => {
        console.error('Error fetching task details:', error);
      });
  }, [apiUrl, taskId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Send a PUT request to update the task with edited properties
    axios.put(`${apiUrl}/api//${taskId}`, {
      title: editedTitle,
      status: editedStatus,
      description: editedDescription,
    })
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error saving changes:', error);
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
              <p>Task ID: {task.id}</p>
              <p>Title: {task.title}</p>
              <p>Status: {task.status}</p>
              <p>Description: {task.description}</p>
              <button onClick={handleEdit}>Edit</button>
            </div>
          )}
          <Link to="/">Back to Task List</Link>
        </div>
      ) : (
        <p>Loading task details...</p>
      )}
    </div>
  );
}

export default TaskDetails;
