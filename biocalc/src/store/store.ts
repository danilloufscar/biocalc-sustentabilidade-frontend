import { configureStore } from '@reduxjs/toolkit';
import { projectApi } from '../services/ApiService';
import { authApi } from '../services/authApi';

export const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(projectApi.middleware)
      .concat(authApi.middleware),
});