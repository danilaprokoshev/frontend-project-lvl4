import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    type: null,
    extra: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpened = true;
      state.type = action.payload.type;
      state.extra = action.payload.extra;
    },
    hideModal: (state) => {
      state.isOpened = false;
      state.type = null;
    },
  },
});

export const { openModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
