import { createSlice } from '@reduxjs/toolkit';

export const channelsInfoSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    addChannels: (state, action) => {
      state.channels.push(...action.payload);
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    setCurrentChannelId: (state, action) => ({
      ...state,
      currentChannelId: action.payload,
    }),
  },
});

export const { addChannels, addChannel, setCurrentChannelId } = channelsInfoSlice.actions;

export default channelsInfoSlice.reducer;
