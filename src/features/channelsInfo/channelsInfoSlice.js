import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from "react-redux";
import _ from 'lodash';

// const dispatch = useDispatch();
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
    deleteChannel: (state, action) => {
     if (state.currentChannelId === action.payload) {
        state.currentChannelId = 1;
      }
     _.remove(state.channels, (ch) => ch.id === action.payload);
    },
  },
});

export const { addChannels, addChannel, setCurrentChannelId, deleteChannel } = channelsInfoSlice.actions;

export default channelsInfoSlice.reducer;
