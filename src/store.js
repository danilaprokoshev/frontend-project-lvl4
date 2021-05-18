import { configureStore } from '@reduxjs/toolkit';
import channelsInfoReducer from './features/channelsInfo/channelsInfoSlice.js';
import messagesInfoReducer from './features/messagesInfo/messagesInfoSlice.js';
import modalReducer from './features/modal/modalSlice.js';

export default configureStore({
  reducer: {
    channelsInfo: channelsInfoReducer,
    messagesInfo: messagesInfoReducer,
    modal: modalReducer,
  },
});
