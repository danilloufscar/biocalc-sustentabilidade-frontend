// src/store/api/projectApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProjectPayload } from '@/Types/Types';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000',
    prepareHeaders: (headers) => {
       // Não esqueça de pegar o token do AuthState aqui
       const token = localStorage.getItem('token'); 
       if (token) headers.set('authorization', `Bearer ${token}`);
       return headers;
    }
  }),
  tagTypes: ['Project'],
  endpoints: (builder) => ({
    
    // Step 0: Criar Projeto
    createProject: builder.mutation<any, Partial<ProjectPayload['identification']>>({
      query: (data) => ({
        url: '/projects/',
        method: 'POST',
        body: data,
      }),
    }),

    // Steps 1-10: Atualizar Steps (Rota Genérica ou Específica)
    // Sugestão: Use a rota dinâmica que criamos no backend
    updateProjectStep: builder.mutation<any, { projectId: number; step: number; data: any }>({
      query: ({ projectId, step, data }) => ({
        url: `/projects/${projectId}/step/${step}`,
        method: 'PUT', // ou POST, dependendo da sua rota
        body: data,
      }),
    }),

    // Step Final: Calcular
    calculateResults: builder.mutation<any, { projectId: number }>({
      query: ({ projectId }) => ({
        url: `/projects/${projectId}/calculate`,
        method: 'POST',
      }),
      invalidatesTags: ['Project'],
    }),
    
    // Buscar Projeto Completo
    getProject: builder.query<ProjectPayload, number>({
      query: (id) => `/projects/${id}`,
      providesTags: ['Project'],
    }),
  }),
});

export const { 
  useCreateProjectMutation, 
  useUpdateProjectStepMutation, 
  useCalculateResultsMutation,
  useGetProjectQuery 
} = projectApi;