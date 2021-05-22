import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

export const messagesInfoSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    deleteMessages: (state, action) => {
      _.remove(state.messages, (msg) => msg.channelId === action.payload);
    },
  },
});

export const { addMessages, addMessage, deleteMessages } = messagesInfoSlice.actions;

export default messagesInfoSlice.reducer;
