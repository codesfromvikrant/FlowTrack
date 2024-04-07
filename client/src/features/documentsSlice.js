import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: []
};

export const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {

  },
});

export const {
} = documentsSlice.actions;

export default documentsSlice.reducer;
