import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const DEFAULT_CHANNEL_ID = 1;

export const channelsInfoSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    addChannels: (state, action) => {
      state.channels.splice(0, Infinity, ...action.payload);
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    setCurrentChannelId: (state, action) => {
      _.set(state, 'currentChannelId', action.payload);
    },
    deleteChannel: (state, action) => {
      const currentChannelId = (state.currentChannelId === action.payload)
        ? DEFAULT_CHANNEL_ID
        : state.currentChannelId;
      state.channels.filter((ch) => ch.id !== action.payload);
      _.set(state, 'currentChannelId', currentChannelId);
    },
    changeNameChannel: (state, action) => {
      const channel = state.channels.find((ch) => ch.id === action.payload.id);
      channel.name = action.payload.name;
    },
  },
});

export const {
  addChannels,
  addChannel,
  setCurrentChannelId,
  deleteChannel,
  changeNameChannel,
} = channelsInfoSlice.actions;

export default channelsInfoSlice.reducer;
