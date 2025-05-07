import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Optional: set token header if stored
const token = localStorage.getItem("token");
if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default api;
// filepath: frontend/src/services/api.js

const API_BASE_URL = "http://localhost:5000/api";

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const fetchInventory = async () => {
  const response = await fetch(`${API_BASE_URL}/inventory`);
  if (!response.ok) {
    throw new Error("Failed to fetch inventory");
  }
  return response.json();
};

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export const fetchSuppliers = async () => {
  const response = await fetch(`${API_BASE_URL}/supplier`);
  if (!response.ok) {
    throw new Error("Failed to fetch suppliers");
  }
  return response.json();
};

// Additional functions for creating, updating, and deleting resources can be added here
