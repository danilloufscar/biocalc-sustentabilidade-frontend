// src/services/projectApi.ts

const API_BASE_URL = 'http://localhost:8000';

// Helper para pegar o token
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

// Step 0: Criar Projeto
export const createProject = async (data: {
    name: string;
    company_name?: string;
    cnpj?: string;
    state?: string;
    city?: string;
    tech_responsible?: string;
    phone?: string;
    email?: string;
}) => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error(`Failed to create project: ${response.statusText}`);
    }
    
    return response.json();
};

// Steps 1-10: Atualizar Step
export const updateProjectStep = async (projectId: number, step: number, data: any) => {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/step/${step}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error(`Failed to update step ${step}: ${response.statusText}`);
    }
    
    return response.json();
};

// Calcular Resultados
export const calculateResults = async (projectId: number) => {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/calculate`, {
        method: 'POST',
        headers: getAuthHeaders()
    });
    
    if (!response.ok) {
        throw new Error(`Failed to calculate results: ${response.statusText}`);
    }
    
    return response.json();
};

// Buscar Projeto
export const getProject = async (projectId: number) => {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    
    if (!response.ok) {
        throw new Error(`Failed to get project: ${response.statusText}`);
    }
    
    return response.json();
};

// Buscar Progresso do Projeto
export const getProjectProgress = async (projectId: number) => {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/progress`, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    
    if (!response.ok) {
        throw new Error(`Failed to get project progress: ${response.statusText}`);
    }
    
    return response.json();
};

// Listar Projetos
export const listProjects = async () => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    
    if (!response.ok) {
        throw new Error(`Failed to list projects: ${response.statusText}`);
    }
    
    return response.json();
};

// Deletar Projeto
export const deleteProject = async (projectId: number) => {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    
    if (!response.ok) {
        throw new Error(`Failed to delete project: ${response.statusText}`);
    }
    
    return response.json();
};
