import { Input, Button, Card } from '@/components/GenericComponents';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {

  const navigate = useNavigate();

  return (
  <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
        Crie sua conta
      </h2>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-4">
          <Input label="Nome Completo" placeholder="João Silva" />
          <Input label="Nome da Empresa" placeholder="BioEnergia S.A." />
          <Input label="CNPJ" placeholder="00.000.000/0000-00" />
          <Input label="E-mail" type="email" placeholder="joao@bioenergia.com.br" />
          <Input label="Senha" type="password" />
          <Input label="Confirme a Senha" type="password" />
          
          <div className="pt-2">
             <Button className="w-full" onClick={() => navigate('/dashboard')}>
              Cadastrar
            </Button>
          </div>
        </form>
         <div className="mt-4 text-center">
            <button onClick={() => navigate('/login')} className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
              Já tenho uma conta
            </button>
         </div>
      </Card>
    </div>
  </div>
  )
};