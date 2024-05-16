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
  taskForm: true,
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
      const index = state[key].data.findIndex((item) => item._id === value.id);
      state[key].data[index] = value.data;
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

export const getAllTasksGroup = (projectId) => catchAsync(async (dispatch, getState) => {
  const response = await axios.get(`${apiBaseUrl}tasks/tasksgroup?projectId=${projectId}`, headersTypeJson);
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


export default tasksSlice.reducer;
