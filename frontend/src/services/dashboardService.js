import axios from 'axios';

const API_URL = 'http://localhost:5000/api/dashboard/';

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

// Get dashboard data
const getDashboardData = async () => {
  const response = await api.get('/');
  return response.data;
};

const dashboardService = {
  getDashboardData,
};

export default dashboardService;
