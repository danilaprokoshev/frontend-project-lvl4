import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './features/content/contentSlice.js';

export default configureStore({
  reducer: {
    content: contentReducer,
  },
});
