import { Leaf, ArrowLeft } from 'lucide-react';
import { Input, Button, Card } from '@/components/GenericComponents';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '@/services/ApiService';
import { useState, FormEvent } from 'react';
import toast from 'react-hot-toast';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Digite seu e-mail');
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      setEmailSent(true);
      toast.success('E-mail enviado! Verifique sua caixa de entrada.');
    } catch (err: any) {
      console.error('Erro:', err);
      toast.error('Erro ao enviar e-mail. Tente novamente.');
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Leaf className="text-white h-8 w-8" />
            </div>
            <span className="text-3xl font-bold text-slate-900">BioCalc</span>
          </div>
          
          <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 mb-4">
                <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">E-mail Enviado!</h2>
              <p className="text-slate-600 mb-6">
                Enviamos um link de recuperação para <strong>{email}</strong>
              </p>
              <p className="text-sm text-slate-500 mb-6">
                Verifique sua caixa de entrada e spam. O link expira em 30 minutos.
              </p>
              <Button onClick={() => navigate('/login')} className="w-full">
                Voltar para Login
              </Button>
            </div>
          </Card>
        </div>
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
          Esqueceu sua senha?
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Digite seu e-mail para receber o link de recuperação
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input 
              label="E-mail Corporativo" 
              type="email" 
              placeholder="seu.nome@empresa.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Button 
              className="w-full" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}
            </Button>
          </form>

          <div className="mt-6">
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center justify-center gap-2 w-full text-sm font-medium text-emerald-600 hover:text-emerald-500"
            >
              <ArrowLeft size={16} />
              Voltar para Login
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};