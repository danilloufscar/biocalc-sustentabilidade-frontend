// src/hooks/useLogout.ts
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@/services/authApi';
import toast from 'react-hot-toast';

export const useLogout = () => {
  const navigate = useNavigate();
  const [logoutMutation] = useLogoutMutation();

  const logout = async () => {
    try {
      // Tenta fazer logout no backend (opcional, valida o token)
      await logoutMutation().unwrap();
      
      // Remove token do localStorage
      localStorage.removeItem('token');
      
      // Toast de sucesso
      toast.success('Logout realizado com sucesso!');
      
      // Redireciona para login
      setTimeout(() => {
        navigate('/login');
      }, 500);
      
    } catch (err: any) {
      // Mesmo se der erro no backend, remove o token localmente
      localStorage.removeItem('token');
      
      console.error('Erro ao fazer logout:', err);
      toast.error('Sessão encerrada');
      
      navigate('/login');
    }
  };

  return { logout };
};