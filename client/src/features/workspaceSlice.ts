import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  workspace: {
    data: [],
    currentId: "",
    currentData: {},
  },
  activeWorkspaceForm: false,
  tags: {
    data: [],
    error: "",
  },
};

export const workspaceSlice = createSlice({
  name: "workspace",
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
    toggleActiveWorkspaceForm: (state) => {
      state.activeWorkspaceForm = !state.activeWorkspaceForm;
    },
    setWorkspaceId: (state, action) => {
      state.workspace.currentId = action.payload;
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
  toggleActiveWorkspaceForm,
  setWorkspaceId,
} = workspaceSlice.actions;

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

export const addWorkspace = (formdata) =>
  catchAsync(async (dispatch, getState) => {
    await axios.post(`${apiBaseUrl}workspaces`, formdata, headersTypeJson);
    dispatch(addData({ key: "workspace", value: formdata }));
  });

export const getAllWorkspaces = () =>
  catchAsync(async (dispatch, getState) => {
    const response = await axios.get(
      `${apiBaseUrl}workspaces`,
      headersTypeJson
    );
    const { data } = await response.data;
    const { workspaces } = data;
    dispatch(setAllData({ key: "workspace", value: workspaces }));
  });

export const getWorkspaceProjects = (id) =>
  catchAsync(async (dispatch, getState) => {
    const response = await axios.get(
      `${apiBaseUrl}workspaces/${id}/projects`,
      headersTypeJson
    );
    const { data } = await response.data;
    const { projects } = data;
    dispatch(setAllData({ key: "workspace", value: projects }));
  });

export default workspaceSlice.reducer;
