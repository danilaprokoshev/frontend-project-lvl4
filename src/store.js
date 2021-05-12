import { configureStore } from '@reduxjs/toolkit';
import channelsInfoReducer from './features/channelsInfo/channelsInfoSlice.js';
import messagesInfoReducer from './features/messagesInfo/messagesInfoSlice.js';

export default configureStore({
  reducer: {
    channelsInfo: channelsInfoReducer,
    messagesInfo: messagesInfoReducer,
  },
});
