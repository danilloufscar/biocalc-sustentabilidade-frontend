import { Leaf } from 'lucide-react';
import { Input, Button, Card } from '@/components/GenericComponents';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/services/authApi';
import { useGetCurrentUserQuery } from '@/services/ApiService';
import { useState, FormEvent, useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slice/authSlice';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [skipUserQuery, setSkipUserQuery] = useState(true);
  
  // Query para buscar dados do usuário após login
  const { data: userData } = useGetCurrentUserQuery(undefined, {
    skip: skipUserQuery,
  });
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Quando os dados do usuário chegarem, salva no Redux
  useEffect(() => {
    if (userData) {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        dispatch(setCredentials({ user: userData, token }));
        toast.success('Login realizado com sucesso!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      }
    }
  }, [userData, dispatch, navigate]);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'rememberMe' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Preencha todos os campos');
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      if (formData.rememberMe) {
  localStorage.setItem('token', result.access_token);
} else {
  sessionStorage.setItem('token', result.access_token);
}
      
      // Salvar token no localStorage
      //localStorage.setItem('token', result.access_token);
      
      // Ativar query para buscar dados do usuário
      setSkipUserQuery(false);
      
    } catch (err: any) {
      console.error('Erro ao fazer login:', err);
      
      if (err?.status === 401) {
        toast.error('E-mail ou senha incorretos');
      } else if (err?.status === 404) {
        toast.error('Usuário não encontrado');
      } else {
        toast.error(err?.data?.detail || 'Erro ao fazer login');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center gap-2">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Leaf className="text-white h-8 w-8" />
          </div>
          <span className="text-3xl font-bold text-slate-900">BioCalc</span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Acesse sua conta
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Plataforma de Eficiência Energético-Ambiental
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input 
              label="E-mail Corporativo" 
              type="email" 
              placeholder="seu.nome@empresa.com.br"
              value={formData.email}
              onChange={handleChange('email')}
              required
            />
            <Input 
              label="Senha" 
              type="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange('password')}
              required
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox" 
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded"
                  checked={formData.rememberMe}
                  onChange={handleChange('rememberMe')}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                  Lembrar-me
                </label>
              </div>
              <div className="text-sm">
                <button
            type="button"
              onClick={() => navigate('/forgot-password')}
              className="font-medium text-emerald-600 hover:text-emerald-500 bg-transparent border-none p-0 cursor-pointer hover:underline"
              >
    Esqueceu a senha?
  </button>
              </div>
            </div>

            <Button 
              className="w-full" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">
                  Não tem uma conta?
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1">
              <Button variant="outline" onClick={() => navigate('/register-account')}>
                Criar conta empresarial
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};