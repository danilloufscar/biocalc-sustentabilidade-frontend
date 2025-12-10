import { Leaf } from 'lucide-react';
import { Input, Button, Card } from '@/components/GenericComponents';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useResetPasswordMutation } from '@/services/ApiService';
import { useState, FormEvent } from 'react';
import toast from 'react-hot-toast';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      toast.error('Token inválido');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('A senha deve ter no mínimo 8 caracteres');
      return;
    }

    try {
      await resetPassword({
        token,
        new_password: formData.password
      }).unwrap();
      
      toast.success('Senha alterada com sucesso!');
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      
    } catch (err: any) {
      console.error('Erro:', err);
      
      if (err?.status === 400) {
        toast.error('Link expirado ou inválido');
      } else {
        toast.error('Erro ao redefinir senha');
      }
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <Card className="max-w-md p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Link Inválido</h2>
          <p className="text-slate-600 mb-6">O link de recuperação é inválido ou expirou.</p>
          <Button onClick={() => navigate('/login')} className="w-full">
            Voltar para Login
          </Button>
        </Card>
      </div>
    );
  }

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
          Nova Senha
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Digite sua nova senha
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input 
              label="Nova Senha" 
              type="password" 
              placeholder="Mínimo 8 caracteres"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            
            <Input 
              label="Confirme a Senha" 
              type="password" 
              placeholder="Digite novamente"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
            
            <Button 
              className="w-full" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? 'Alterando...' : 'Alterar Senha'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};