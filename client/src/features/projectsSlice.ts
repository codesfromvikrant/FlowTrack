import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  projects: {
    data: [],
    currentId: "",
    currentData: {},
  },
  activeCreateProject: false,
  tags: {
    data: [],
    error: "",
  },
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setAllData: (state, action) => {
      const { key, value } = action.payload;
      state[key].data = value;
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
    setTagError: (state, action) => {
      state.tags.error = action.payload;
    },
    setCurrentData: (state, action) => {
      const { key, value } = action.payload;
      state[key].currentData = value;
    },
    toggleActiveCreateProject: (state) => {
      state.activeCreateProject = !state.activeCreateProject;
    },
    setProjectId: (state, action) => {
      state.projects.currentId = action.payload;
    },
  },
});

export const {
  setAllData,
  addData,
  updateData,
  deleteData,
  setTagError,
  setCurrentData,
  toggleActiveCreateProject,
  setProjectId,
} = projectsSlice.actions;

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

export const getWorkspaceProjects = (id) =>
  catchAsync(async (dispatch, getState) => {
    const response = await axios.get(
      `${apiBaseUrl}projects?workspaceId=${id}`,
      headersTypeJson
    );
    const { data } = await response.data;
    const { projects } = data;
    dispatch(setAllData({ key: "projects", value: projects }));
  });

export const getCurrentProjectData = (id) =>
  catchAsync(async (dispatch, getState) => {
    const response = await axios.get(
      `${apiBaseUrl}projects/${id}`,
      headersTypeJson
    );
    const { data } = await response.data;
    const { project } = data;
    dispatch(setCurrentData({ key: "projects", value: project }));
  });

export const createProject = (formdata) =>
  catchAsync(async (dispatch, getState) => {
    const response = await axios.post(
      `${apiBaseUrl}projects`,
      formdata,
      headersTypeJson
    );
    const { data } = await response.data;
    const { project } = data;
    dispatch(addData({ key: "projects", value: project }));
  });

export default projectsSlice.reducer;
