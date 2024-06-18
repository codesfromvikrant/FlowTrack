import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tasksgroups: {
    data: [],
    currentId: "",
  },
  tasks: {
    data: [],
    currentId: "",
  },
  taskForm: false,
  todos: {
    data: [],
    currentId: "",
  },
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setAllData: (state, action) => {
      const { key, value } = action.payload;
      state[key].data = value;
    },
    setCurrentId: (state, action) => {
      const { key, value } = action.payload;
      state[key].currentId = value;
    },
    addData: (state, action) => {
      const { key, value } = action.payload;
      state[key].data.push(value);
    },
    updateData: (state, action) => {
      const { key, value } = action.payload;
      const index = state[key].data.findIndex((item) => item._id === value._id);
      state[key].data[index] = value;
    },
    deleteData: (state, action) => {
      const { key, value } = action.payload;
      state[key].data = state[key].data.filter((item) => item._id !== value.id);
    },
    toggleTaskForm: (state, action) => {
      state.taskForm = action.payload;
    },
  },
});

export const { setAllData, setCurrentId, addData, updateData, deleteData, toggleTaskForm } = tasksSlice.actions;

const catchAsync = (fn) => {
  return (dispatch, getState) => {
    fn(dispatch, getState).catch((error) => console.error(error));
  };
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const headersTypeJson = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const createTasksGroup = (formdata) => catchAsync(async (dispatch, getState) => {
  await axios.post(`${apiBaseUrl}tasks/tasksgroup`, formdata, headersTypeJson);
  dispatch(addData({ key: "taskgroups", value: formdata }));
});

export const getAllTasksGroup = (workspaceId) => catchAsync(async (dispatch, getState) => {
  const response = await axios.get(`${apiBaseUrl}tasks/tasksgroup?workspaceId=${workspaceId}`, headersTypeJson);
  const { data } = await response.data;
  const { tasksGroup } = data;
  dispatch(setAllData({ key: "tasksgroups", value: tasksGroup }));
});




////// Tasks ///////
export const createTask = (formdata) => catchAsync(async (dispatch, getState) => {
  const response = await axios.post(`${apiBaseUrl}tasks`, formdata, headersTypeJson);
  const { data } = await response.data;
  const { task } = data;
  dispatch(addData({ key: "tasks", value: task }));
});

export const getAllTasks = (projectId) => catchAsync(async (dispatch, getState) => {
  const response = await axios.get(`${apiBaseUrl}tasks?projectId=${projectId}`, headersTypeJson);
  const { data } = await response.data;
  const { tasks } = data;
  dispatch(setAllData({ key: "tasks", value: tasks }));
});

export const updateTask = (formdata, id) => catchAsync(async (dispatch, getState) => {
  const response = await axios.patch(`${apiBaseUrl}tasks/${id}`, formdata, headersTypeJson);
  const { data } = await response.data;
  const { task } = data;
  dispatch(updateData({ key: "tasks", value: task }));
});

export const deleteTask = (id) => catchAsync(async (dispatch, getState) => {
  await axios.delete(`${apiBaseUrl}tasks/${id}`, headersTypeJson);
  dispatch(deleteData({ key: "tasks", value: { id } }));
});





////// Todos ///////
export const getAllTodos = (taskId) => catchAsync(async (dispatch, getState) => {
  const response = await axios.get(`${apiBaseUrl}todos?taskId=${taskId}`, headersTypeJson);
  const { data } = await response.data;
  const { todos } = data;
  dispatch(setAllData({ key: "todos", value: todos }));
});

export const addTodo = (formdata) => catchAsync(async (dispatch, getState) => {
  const response = await axios.post(`${apiBaseUrl}todos`, formdata, headersTypeJson);
  const { data } = await response.data;
  const { todo } = data;
  dispatch(addData({ key: "todos", value: todo }));
});

export const updateTodo = (formdata, id) => catchAsync(async (dispatch, getState) => {
  const response = await axios.patch(`${apiBaseUrl}todos/${id}`, formdata, headersTypeJson);
  const { data } = await response.data;
  const { todo } = data;
  dispatch(updateData({ key: "todos", value: todo }));
});

export const deleteTodo = (id) => catchAsync(async (dispatch, getState) => {
  await axios.delete(`${apiBaseUrl}todos/${id}`, headersTypeJson);
  dispatch(deleteData({ key: "todos", value: { id } }));
});


export default tasksSlice.reducer;
