import { Input, Button, Card } from '@/components/GenericComponents';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@/services/authApi';
import { useState, FormEvent } from 'react';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();
  
  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    cnpj: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        company_name: formData.company_name,
        cnpj: formData.cnpj,
      }).unwrap();
      
      console.log('Usuário criado:', result);
      
      // Redirecionar para login após sucesso
      navigate('/login');
    } catch (err: any) {
      console.error('Erro ao registrar:', err);
      alert(err?.data?.detail || 'Erro ao criar conta');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Crie sua conta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input 
              label="Nome Completo" 
              placeholder="João Silva" 
              value={formData.name}
              onChange={handleChange('name')}
            />
            <Input 
              label="Nome da Empresa" 
              placeholder="BioEnergia S.A." 
              value={formData.company_name}
              onChange={handleChange('company_name')}
            />
            <Input 
              label="CNPJ" 
              placeholder="00.000.000/0000-00" 
              value={formData.cnpj}
              onChange={handleChange('cnpj')}
            />
            <Input 
              label="E-mail" 
              type="email" 
              placeholder="joao@bioenergia.com.br" 
              value={formData.email}
              onChange={handleChange('email')}
            />
            <Input 
              label="Senha" 
              type="password" 
              value={formData.password}
              onChange={handleChange('password')}
            />
            <Input 
              label="Confirme a Senha" 
              type="password" 
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              
            />
            
            {error && (
              <div className="text-red-600 text-sm">
                {'data' in error && error.data 
                  ? (error.data as any).detail 
                  : 'Erro ao criar conta'}
              </div>
            )}
            
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <button 
              onClick={() => navigate('/login')} 
              className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
            >
              Já tenho uma conta
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};