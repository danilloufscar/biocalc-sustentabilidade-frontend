// src/hooks/useLogout.ts
import { useNavigate } from 'react-router-dom';
import { authApi, useLogoutMutation } from '@/services/authApi';
import { useAppDispatch } from '@/store/hooks';
import { logoutAction } from '@/store/slice/authSlice';
import toast from 'react-hot-toast';

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logoutMutation] = useLogoutMutation();

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (err) {
      console.error('Erro ao fazer logout no backend:', err);
    } finally {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      // Sempre limpa o estado local, mesmo se o backend falhar
      dispatch(logoutAction());
      dispatch(authApi.util.resetApiState());
      toast.success('Logout realizado com sucesso!');
      
     navigate('/login');
    }
  };

  return { logout };
};