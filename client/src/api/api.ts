import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const createTask = async (taskData: {
  title: string;
  description: string;
}) => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

export const getAllTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const getUserTasks = async () => {
  const response = await api.get("/tasks/my-posted-tasks");
  return response.data;
};

export const getTask = async (id: string) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const applyToTask = async (taskId: string, message: string) => {
  const response = await api.post(`/tasks/${taskId}/apply`, { message });
  return response.data;
};

export const getTaskApplications = async (taskId: string) => {
  const response = await api.get(`/tasks/${taskId}/applications`);
  return response.data;
};
