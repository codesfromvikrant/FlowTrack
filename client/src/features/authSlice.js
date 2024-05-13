import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURL from "../config";

const initialState = {
  logged_in: false,
  show_sidebar: true,
  signupVisible: false,
  username: {
    message: "",
    available: false,
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.logged_in = action.payload;
    },
    setAuth: (state, action) => {
      state.username = action.payload.username;
      state.email_id = action.payload.email_id;
    },
    removeAuth: (state) => {
      state.username = "";
      state.email_id = "";
    },
    showSidebar: (state) => {
      state.show_sidebar = !state.show_sidebar;
    },
    toggleSignup: (state) => {
      state.signupVisible = !state.signupVisible;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setLoggedIn, setAuth, removeAuth, showSidebar, toggleSignup, setUsername } =
  authSlice.actions;

const catchAsync = (fn) => {
  return (dispatch, getState) => {
    fn(dispatch, getState).catch((error) => console.error(error));
  };
};

const headersObj = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const uniqueUsername = (username) => catchAsync(async (dispatch, getState) => {
  const response = await axios.get(`${apiURL}users/unique_username/${username}`, headersObj);
  const result = await response.data;
  result.status === "success"
    ? dispatch(setUsername({ message: result.message, available: true }))
    : dispatch(setUsername({ message: result.message, available: false }));
});

export const userSignup = (formdata) => catchAsync(async (dispatch, getState) => {
  const response = await axios.post(`${apiURL}users/signup`, formdata, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.data;
  if (result?.token && result?.status) dispatch(setLoggedIn(true));
});

export const userSignin = (data) =>
  catchAsync(async (dispatch, getState) => {
    const response = await axios.post(
      `${apiURL}users/signin`,
      data,
      headersObj
    );
    const result = await response.data;
    if (result?.token) {
      dispatch(setLoggedIn(true));
      localStorage.setItem("token", result.token);
    }
  });

export default authSlice.reducer;
