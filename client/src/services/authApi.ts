import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user: User;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface TaskRequest {
  title: string;
  description: string;
}

interface ApplyToTaskRequest {
  taskId: string;
  message: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Tasks", "User"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<User, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),

    // Tasks
    createTask: builder.mutation<Task, TaskRequest>({
      query: (taskData) => ({
        url: "/tasks",
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["Tasks"],
    }),
    getAllTasks: builder.query<Task[], void>({
      query: () => "/tasks",
      providesTags: ["Tasks"],
    }),
    getUserTasks: builder.query<Task[], void>({
      query: () => "/tasks/my-posted-tasks",
      providesTags: ["Tasks"],
    }),
    getTask: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
    }),
    applyToTask: builder.mutation<any, ApplyToTaskRequest>({
      query: ({ taskId, message }) => ({
        url: `/tasks/${taskId}/apply`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: ["Tasks"],
    }),
    getTaskApplications: builder.query<any, string>({
      query: (taskId) => `/tasks/${taskId}/applications`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useCreateTaskMutation,
  useGetAllTasksQuery,
  useGetUserTasksQuery,
  useGetTaskQuery,
  useApplyToTaskMutation,
  useGetTaskApplicationsQuery,
} = apiSlice;
