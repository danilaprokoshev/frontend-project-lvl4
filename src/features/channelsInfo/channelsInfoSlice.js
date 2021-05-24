import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

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
      state.channels.push(action.payload);
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    // TODO: сделать константу для дефолтного канала
    deleteChannel: (state, action) => {
      if (state.currentChannelId === action.payload) {
        state.currentChannelId = 1;
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
