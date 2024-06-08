// Import necessary libraries
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit
import userAuthorReducer from './slices/userAuthorslice'; // Import userAuthorReducer from the slice file

// Create Redux store
export const store = configureStore({
  reducer: {
    userAuthoruserAuthorLoginReducer: userAuthorReducer // Set userAuthorReducer as the reducer for userAuthoruserAuthorLoginReducer slice
  }
});
