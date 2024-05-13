import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskgroups: {
    data: [],
    currentId: "",
  },
  tasks: {
    data: [],
    currentId: "",
  },
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
});

export const {} = tasksSlice.actions;
export default tasksSlice.reducer;
