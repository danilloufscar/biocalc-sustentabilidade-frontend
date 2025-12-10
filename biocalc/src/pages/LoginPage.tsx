import { Leaf } from 'lucide-react';
import { Input, Button, Card } from '@/components/GenericComponents';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/services/authApi';
import { useState, FormEvent } from 'react';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'rememberMe' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.email || !formData.password) {
      toast.error('Preencha todos os campos');
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      
      // Salvar token no localStorage
      localStorage.setItem('token', result.access_token);
      // Toast de sucesso
      toast.success('Login realizado com sucesso!');
      
      // Redirecionar para dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
      
    } catch (err: any) {
      console.error('Erro ao fazer login:', err);
      
      // Mensagens de erro específicas
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
                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                  Esqueceu a senha?
                </a>
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