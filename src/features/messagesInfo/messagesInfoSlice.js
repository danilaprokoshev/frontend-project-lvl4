import { createSlice } from '@reduxjs/toolkit';

export const messagesInfoSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(...action.payload);
    },
  },
});

export const { addMessage } = messagesInfoSlice.actions;

export default messagesInfoSlice.reducer;
