import axios from "axios";

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

export const getMe = () => API.get("/auth/me");


export const logout = () => {
  authToken = null;
  try {
    sessionStorage.removeItem("token");
  } catch (e) { }
};

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

API.interceptors.request.use(
  (config) => {
    // prefer in-memory token, fall back to localStorage
    const token =
      authToken ||
      (typeof sessionStorage !== "undefined" &&
        sessionStorage.getItem("token"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
export const changePassword = (data) => API.post("/auth/change-password", data);
