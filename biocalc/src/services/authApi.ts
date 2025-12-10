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

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000',
  }),
  endpoints: (builder) => ({
    register: builder.mutation<UserResponse, UserCreate>({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    
    login: builder.mutation<{ access_token: string; token_type: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;