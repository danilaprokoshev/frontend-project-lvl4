import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { deleteChannel } from '../channelsInfo/channelsInfoSlice.js';

export const messagesInfoSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessages: (state, action) => {
      state.messages.splice(0, Infinity, ...action.payload);
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteChannel, (state, action) => {
        _.remove(state.messages, (msg) => msg.channelId === action.payload);
      });
  },
});

export const { addMessages, addMessage, deleteMessages } = messagesInfoSlice.actions;

export default messagesInfoSlice.reducer;
