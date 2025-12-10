import React, { useState, useEffect } from 'react';
import { User, Save, Building, Mail, Lock } from 'lucide-react';
import { Input, Button, Card } from '../components/GenericComponents';
import { useGetCurrentUserQuery } from '@/services/authApi';
import toast from 'react-hot-toast';

export const UserProfilePage = () => {
  // Busca dados do usuário atual
  const { data: currentUser, isLoading, error } = useGetCurrentUserQuery();
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        company: currentUser.company_name,
        email: currentUser.email,
        password: '',
        confirmPassword: ''
      });
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação de senha
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    setIsSaving(true);
    
    // TODO: Implementar chamada API para atualizar perfil
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Perfil atualizado com sucesso!');
    }, 1000);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 bg-slate-200 rounded"></div>
            <div className="md:col-span-2 h-96 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <div className="text-center py-12">
            <p className="text-red-600">Erro ao carregar dados do usuário</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
            >
              Tentar novamente
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Meu Perfil</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cartão de Avatar/Resumo */}
        <div className="md:col-span-1">
          <Card className="text-center h-full">
            <div className="flex flex-col items-center py-6">
              <div className="h-24 w-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 border-4 border-white shadow-lg">
                <User size={48} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">{formData.name}</h2>
              <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-100">
                Administrador
              </div>
              {currentUser?.created_at && (
                <p className="text-xs text-slate-400 mt-4">
                  Membro desde {new Date(currentUser.created_at).toLocaleDateString('pt-BR')}
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Formulário de Edição */}
        <div className="md:col-span-2">
          <Card title="Informações Pessoais">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <Input 
                  label="Nome Completo" 
                  value={formData.name}
                  icon={User}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                
                <Input 
                  label="Empresa" 
                  value={formData.company}
                  icon={Building}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  required
                />

                <Input 
                  label="E-mail Corporativo" 
                  type="email"
                  value={formData.email}
                  icon={Mail}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />

                {currentUser?.cnpj && (
                  <Input 
                    label="CNPJ" 
                    value={currentUser.cnpj}
                    readOnly
                  />
                )}

                <div className="pt-4 border-t border-slate-100 mt-4">
                  <h3 className="text-sm font-medium text-slate-900 mb-4">Alterar Senha</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      label="Nova Senha" 
                      type="password"
                      placeholder="Deixe em branco para manter"
                      icon={Lock}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <Input 
                      label="Confirmar Senha" 
                      type="password"
                      placeholder="Repita a nova senha"
                      icon={Lock}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" icon={Save} disabled={isSaving}>
                  {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};