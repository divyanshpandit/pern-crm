import axios from 'axios';

const API_URL = 'http://localhost:5000/api/leads/';

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

// Create a new lead
const createLead = async (leadData) => {
  const response = await api.post('/', leadData);
  return response.data;
};

// Get all leads
const getLeads = async () => {
  const response = await api.get('/');
  return response.data;
};

// Get a single lead
const getLead = async (leadId) => {
  const response = await api.get(`/${leadId}`);
  return response.data;
};

// Update a lead
const updateLead = async (leadId, leadData) => {
  const response = await api.put(`/${leadId}`, leadData);
  return response.data;
};

// Delete a lead
const deleteLead = async (leadId) => {
  const response = await api.delete(`/${leadId}`);
  return response.data;
};

const leadService = {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
};

export default leadService;
