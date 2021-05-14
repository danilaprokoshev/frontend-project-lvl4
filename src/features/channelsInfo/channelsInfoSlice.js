import { createSlice } from '@reduxjs/toolkit';

export const channelsInfoSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    addChannel: (state, action) => {
      state.channels.push(...action.payload);
    },
    setCurrentChannelId: (state, action) => ({
      ...state,
      currentChannelId: action.payload,
    }),
  },
});

export const { addChannel, setCurrentChannelId } = channelsInfoSlice.actions;

export default channelsInfoSlice.reducer;
