import { configureStore } from '@reduxjs/toolkit';
import channelsInfoReducer from './slices/channelsInfo/channelsInfoSlice.js';
import messagesInfoReducer from './slices/messagesInfo/messagesInfoSlice.js';
import modalReducer from './slices/modal/modalSlice.js';

export default () => configureStore({
  reducer: {
    channelsInfo: channelsInfoReducer,
    messagesInfo: messagesInfoReducer,
    modal: modalReducer,
  },
});
