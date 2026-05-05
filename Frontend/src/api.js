import axios from "axios";

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

API.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const getTodos = (params) => API.get("/todos", { params });
export const createTodo = (data) => API.post("/todos", data);
export const updateTodo = (id, data) => API.put(`/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
