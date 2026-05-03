import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const getTodos = (token, params) =>
  API.get("/todos", { params, headers: { Authorization: `Bearer ${token}` } });
export const createTodo = (token, data) =>
  API.post("/todos", data, { headers: { Authorization: `Bearer ${token}` } });
export const updateTodo = (token, id, data) =>
  API.put(`/todos/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteTodo = (token, id) =>
  API.delete(`/todos/${id}`, { headers: { Authorization: `Bearer ${token}` } });
