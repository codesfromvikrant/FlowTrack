import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  confirmModal: false
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setConfirmModal: (state, action) => {
      state.confirmModal = action.payload;
    },
  },
});

export const {
  setConfirmModal
} = globalSlice.actions;
export default globalSlice.reducer;