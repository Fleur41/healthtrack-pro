import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Your Flask backend URL
});

// Automatically add token to headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => API.post("/api/auth/register", data);
export const loginUser = (data) => API.post("/api/auth/login", data);

export const fetchPrograms = () => API.get("/api/programs");
export const createProgram = (data) => API.post("/api/programs", data);

export const fetchClients = () => API.get("/api/clients");
export const createClient = (data) => API.post("/api/clients", data);

export const searchClients = (query) => API.get(`/api/clients/search?q=${query}`);


// Update a client
export const updateClient = (id, data) => API.put(`/api/clients/${id}`, data);

// Delete a client
export const deleteClient = (id) => API.delete(`/api/clients/${id}`);


export default API;