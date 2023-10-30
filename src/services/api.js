import axios from 'axios';

const API_BASE_URL = 'https://tasks-api-yq7g.onrender.com';

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTaskById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
