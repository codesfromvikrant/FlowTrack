import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: true,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleModalVisibility: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { toggleModalVisibility } = globalSlice.actions;
export default globalSlice.reducer;
