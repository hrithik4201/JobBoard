import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import jobReducer from './slices/jobSlice';
import formReducer from './slices/formSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    form: formReducer,
  },
});

export default store;
