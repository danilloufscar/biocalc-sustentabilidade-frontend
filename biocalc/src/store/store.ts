import { configureStore } from '@reduxjs/toolkit';
import { projectApi } from '@/services/ApiService';
import { authApi } from '@/services/authApi';
import authReducer from '@/store/slice/authSlice';

export const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer, // Adicione o slice de auth
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(projectApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;