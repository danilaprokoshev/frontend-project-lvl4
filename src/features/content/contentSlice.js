import { createSlice } from '@reduxjs/toolkit';

export const contentSlice = createSlice({
  name: 'content',
  initialState: {
    value: {},
  },
  reducers: {
    addContent: (state, action) => {
      Object.assign(state.value, action.payload);
    },
  },
});

export const { addContent } = contentSlice.actions;

export default contentSlice.reducer;
