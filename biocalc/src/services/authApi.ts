import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface UserCreate {
  name: string;
  email: string;
  password: string;
  company_name: string;
  cnpj: string;
}

interface UserResponse {
  id: number;
  name: string;
  email: string;
  company_name: string;
  cnpj: string;
  created_at: string;
}

interface LogoutResponse {
  message: string;
  user: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000',
     prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    register: builder.mutation<UserResponse, UserCreate>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    
    login: builder.mutation<{ access_token: string; token_type: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

     logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
     getCurrentUser: builder.query<UserResponse, void>({
      query: () => '/auth/me',
    }),
  }),
});

export const {
  useRegisterMutation, 
  useLoginMutation, 
  useLogoutMutation,
  useGetCurrentUserQuery  } = authApi;