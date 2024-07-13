import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  logged_in: false,
  username: {
    message: "",
    available: false,
  },
  tags: {
    data: [],
    currentId: "",
  }
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.logged_in = action.payload;
    },
    setAllData: (state, action) => {
      const { key, value } = action.payload;
      state[key].data = value;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setAllData, setLoggedIn, setUsername } = globalSlice.actions;

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

export const isAuthenticated = (token, navigate) => catchAsync(async (dispatch, getState) => {
  if (!token) navigate('/auth/login');
  const response = await axios.post(`${apiBaseUrl}users/is_authenticated`, { token }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { status } = await response.data;
  if (status != "success") {
    navigate('/auth/login')
    return
  };
  dispatch(setLoggedIn(true));
});

export const acceptInvitation = token => catchAsync(async (dispatch, getState) => {
  const response = await axios.get(`${apiBaseUrl}invitation/accept?token=${token}`, headersTypeJson)
  const { data } = await response.data;
  const { redirectUrl } = data;
  window.location.href = redirectUrl
})

export const userSignin = (values) => catchAsync(async (dispatch, getState) => {
  const response = await axios.post(
    `${apiBaseUrl}users/signin`,
    values,
    {
      headers: {
        "Content-Type": "application/json",
      }
    },
  );
  const { data } = await response.data;
  if (data?.token) {
    Cookies.set("token", data.token);
    dispatch(setLoggedIn(true));
  }
  const visitedUrl = sessionStorage.getItem("visitedUrl");
  if (visitedUrl) window.location.href = visitedUrl;
});

export const userSignup = (values) => catchAsync(async (dispatch, getState) => {
  const response = await axios.post(`${apiBaseUrl}users/signup`, values, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { data, status } = await response.data;
  if (data?.token && status) dispatch(setLoggedIn(true));
});

export const uniqueUsername = (username) => catchAsync(async (dispatch, getState) => {
  const response = await axios.get(`${apiBaseUrl}users/unique_username/${username}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.data;
  result.status === "success"
    ? dispatch(setUsername({ message: result.message, available: true }))
    : dispatch(setUsername({ message: result.message, available: false }));
});

export default globalSlice.reducer;
