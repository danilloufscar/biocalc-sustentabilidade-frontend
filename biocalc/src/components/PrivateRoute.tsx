// src/components/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';
import { useGetCurrentUserQuery } from '@/services/authApi';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem('token');
  const { isLoading, isError } = useGetCurrentUserQuery(undefined, {
    skip: !token, // Só faz a query se tiver token
  });

  // Se não tem token, redireciona para login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Enquanto valida o token, mostra loading
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // Se o token é inválido, redireciona para login
  if (isError) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  // Token válido, renderiza o componente
  return <>{children}</>;
};