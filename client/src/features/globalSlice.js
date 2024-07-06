import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  logged_in: false,
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

  },
});

export const { setAllData, setLoggedIn } = globalSlice.actions;

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

export const userSignin = (data) => catchAsync(async (dispatch, getState) => {
  const response = await axios.post(
    `${apiBaseUrl}users/signin`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      }
    },
  );
  const result = await response.data;
  if (result?.token) {
    Cookies.set("token", result.token);
    dispatch(setLoggedIn(true));
  }
  const visitedUrl = sessionStorage.getItem("visitedUrl");
  if (visitedUrl) window.location.href = visitedUrl;
});

export default globalSlice.reducer;
