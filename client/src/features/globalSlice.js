import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tags: {
    data: [],
    currentId: "",
  }
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAllData: (state, action) => {
      const { key, value } = action.payload;
      state[key].data = value;
    },
  },
});

export const { setAllData } = globalSlice.actions;

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

export const getAllTags = () => catchAsync(async (dispatch, getState) => {
  const response = await axios.get(`${apiBaseUrl}tags`, headersTypeJson);
  const { data } = await response.data;
  const { tags } = data;
  dispatch(setAllData({ key: "tags", value: tags }))
});

export default globalSlice.reducer;
