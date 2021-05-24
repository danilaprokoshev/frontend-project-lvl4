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
      state.channels = action.payload;
    },
    addChannel: (state, action) => {
      const channels = state.channels.concat(action.payload);
      return {
        ...state,
        channels,
      };
    },
    setCurrentChannelId: (state, action) => {
      const currentChannelId = action.payload;
      return {
        ...state,
        currentChannelId,
      };
      // state.currentChannelId = action.payload;
    },
    deleteChannel: (state, action) => {
      if (state.currentChannelId === action.payload) {
        state.currentChannelId = DEFAULT_CHANNEL_ID;
      }
      _.remove(state.channels, (ch) => ch.id === action.payload);
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
