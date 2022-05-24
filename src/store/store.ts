import { configureStore } from '@reduxjs/toolkit';
import combinedReducer from './reducers/combined-reducers';

const store = configureStore({
  reducer: combinedReducer,
});

export default store;
