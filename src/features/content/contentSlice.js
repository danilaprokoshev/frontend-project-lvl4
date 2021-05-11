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
    newMessage: (state, action) => {
      state.content.messages.push(action.payload);
    }
  },
});

export const { addContent, newMessage } = contentSlice.actions;

export default contentSlice.reducer;
