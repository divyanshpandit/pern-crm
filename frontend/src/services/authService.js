import axios from 'axios';

// Your backend API URL
const API_URL = 'http://localhost:5000/api/auth/';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
});

/**
 * Register user
 * @param {object} userData - { name, email, password }
 */
const register = async (userData) => {
  const response = await api.post('register', userData);
  return response.data;
};

/**
 * Login user
 * @param {object} userData - { email, password }
 */
const login = async (userData) => {
  const response = await api.post('login', userData);
  
  if (response.data.token) {
    // Store user and token in local storage
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('token', JSON.stringify(response.data.token));
  }
  
  return response.data;
};

/**
 * Logout user
 */
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;