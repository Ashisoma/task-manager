import axios from 'axios';

const API_BASE_URL = 'https://tasks-api-yq7g.onrender.com';

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/tasks`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};