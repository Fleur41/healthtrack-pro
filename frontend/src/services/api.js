import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout and withCredentials
  timeout: 5000,
  withCredentials: true
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    if (!error.response) {
      throw new Error('Network error - please check if the server is running');
    }
    throw error;
  }
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const auth = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
  register: async (username, password) => {
    try {
      const response = await api.post('/auth/register', {
        username,
        password
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(error.response.data.error || 'Registration failed');
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response from server');
      } else {
        // Something happened in setting up the request
        throw new Error('Error setting up request');
      }
    }
  },
};

const programs = {
  getAll: async () => {
    const response = await api.get('/programs');
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/programs', data);
    return response.data;
  },
};

const clients = {
  getAll: async () => {
    const response = await api.get('/clients');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/clients', data);
    return response.data;
  },
  getProfile: async (id) => {
    const response = await api.get(`/clients/${id}/profile`);
    return response.data;
  },
  updateProfile: async (id, data) => {
    const response = await api.put(`/clients/${id}/profile`, data);
    return response.data;
  },
  uploadPhoto: async (id, photo) => {
    const formData = new FormData();
    formData.append('photo', photo);
    const response = await api.post(`/clients/${id}/photos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

const users = {
  getProfile: async (id) => {
    const response = await api.get(`/users/${id}/profile`);
    return response.data;
  },
  updateProfile: async (id, data) => {
    const response = await api.put(`/users/${id}/profile`, data);
    return response.data;
  },
};

export default {
  auth,
  programs,
  clients,
  users,
};