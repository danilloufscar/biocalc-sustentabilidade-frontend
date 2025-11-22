import { Leaf } from 'lucide-react';
import { Input, Button, Card } from '@/components/GenericComponents';
import { useNavigate } from 'react-router-dom';



export const LoginPage = () => {
  const navigate = useNavigate();


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
        <form className="space-y-6">
          <Input 
            label="E-mail Corporativo" 
            type="email" 
            placeholder="seu.nome@empresa.com.br"
          />
          <Input 
            label="Senha" 
            type="password" 
            placeholder="••••••••"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded" />
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

          <Button className="w-full" type="submit" onClick={() =>   navigate('/dashboard')}>
            Entrar
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