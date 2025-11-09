import axios from 'axios';

const API_URL = 'http://localhost:5000/api/activities/';

// Get token from local storage
const getToken = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return token;
};

// Create an axios instance with auth header
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Create a new activity
const createActivity = async (activityData) => {
  const response = await api.post('/', activityData);
  return response.data;
};

// Get all activities for a lead
const getActivitiesForLead = async (leadId) => {
  const response = await api.get(`/${leadId}`);
  return response.data;
};

const activityService = {
  createActivity,
  getActivitiesForLead,
};

export default activityService;
