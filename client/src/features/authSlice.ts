import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURL from "../config";

const initialState = {
  logged_in: false,
  username: "",
  email_id: "",
  show_sidebar: true,
  signupVisible: false,
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
  },
});

export const { setLoggedIn, setAuth, removeAuth, showSidebar, toggleSignup } =
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

export const userSignup = (data) => async (dispatch, getState) => {
  console.log(data);
  // try {
  //   const response = await axios.post(`${apiURL}users/signup`, data, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const result = await response.data;
  //   if (result?.token && result?.status) dispatch(setLoggedIn(true));
  // } catch (error) { console.error(error) }
};

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
