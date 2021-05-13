import { createSlice } from '@reduxjs/toolkit';

export const messagesInfoSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessages: (state, action) => {
      state.messages.push(...action.payload);
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessages, addMessage } = messagesInfoSlice.actions;

export default messagesInfoSlice.reducer;
