// src/pages/ProjectsList.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Trash2, Calendar, CheckCircle, Edit, AlertCircle } from 'lucide-react';
import { useGetProjectsQuery, useDeleteProjectMutation } from '@/services/ApiService';

const ProjectsList: React.FC = () => {
  const navigate = useNavigate();
  const { data: projects = [], isLoading, isError, error, refetch } = useGetProjectsQuery();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (projectId: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este projeto?')) {
      return;
    }

    try {
      setDeletingId(projectId);
      await deleteProject(projectId).unwrap();
    } catch (err) {
      alert('Erro ao excluir projeto: ' + (err as any)?.data?.detail || 'Erro desconhecido');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'Data não disponível';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Concluído') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-4 h-4 mr-1" />
          Concluído
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
        <Edit className="w-4 h-4 mr-1" />
        Em Rascunho
      </span>
    );
  };

  const getProgressBar = (currentStep: number) => {
    const progress = (currentStep / 10) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-red-800 font-medium">Erro ao carregar projetos</h3>
              <p className="text-red-600 text-sm mt-1">
                {(error as any)?.data?.detail || 'Erro ao conectar com o servidor'}
              </p>
              <button 
                onClick={() => refetch()}
                className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium underline"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meus Projetos</h1>
            <p className="text-gray-600 mt-1">Gerencie seus projetos de análise de emissões</p>
          </div>
          <button 
            onClick={() => navigate('/calculator')}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Projeto
          </button>
        </div>

        {/* Projects List */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhum projeto encontrado</h3>
            <p className="text-gray-600 mb-6">Comece criando seu primeiro projeto de análise</p>
            <button 
              onClick={() => navigate('/novo-projeto')}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Criar Primeiro Projeto
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {project.name}
                      </h3>
                      {project.company_name && (
                        <p className="text-sm text-gray-600">{project.company_name}</p>
                      )}
                    </div>
                    {getStatusBadge(project.status)}
                  </div>

                  {/* Info */}
                  <div className="space-y-3 mb-4">
                    {project.biomass_type && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Biomassa:</span> {project.biomass_type}
                      </div>
                    )}
                    
                    <div className="text-sm text-gray-600 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Criado em {formatDate(project.created_at)}
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progresso</span>
                        <span>{project.current_step}/10 etapas</span>
                      </div>
                      {getProgressBar(project.current_step)}
                    </div>
                  </div>

                  {/* Results (if completed) */}
                  {project.status === 'Concluído' && project.carbon_intensity && (
                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <div className="text-xs text-gray-600 mb-1">Intensidade de Carbono</div>
                      <div className="text-lg font-bold text-blue-900">
                        {project.carbon_intensity.toFixed(2)} kg CO₂eq/MJ
                      </div>
                      {project.emission_reduction && (
                        <div className="text-sm text-green-600 mt-1">
                          ↓ {project.emission_reduction.toFixed(1)}% de redução
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/projects/${project.id}`)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      {project.status === 'Concluído' ? 'Ver Detalhes' : 'Continuar'}
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={deletingId === project.id || isDeleting}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      {deletingId === project.id ? (
                        <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;