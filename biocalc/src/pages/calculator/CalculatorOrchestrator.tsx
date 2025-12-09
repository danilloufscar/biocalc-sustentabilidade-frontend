import { useState } from 'react';
import { 
    ArrowRight, 
    ArrowLeft, 
    Save, 
    CheckCircle, 
    Leaf, 
    Factory, 
    Truck, 
    Calculator as CalcIcon 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Importa os tipos definidos anteriormente
import { ProjectPayload, BiomassType } from '@/Types/Types'; // Ajuste o caminho conforme sua estrutura
import { Button, Card, Modal } from '../../components/GenericComponents';
import { StepIndustrial } from './steps/StepIndustrial';
import { StepBiomass } from './steps/StepBiomass';
import { StepLogistics } from './steps/StepLogistics';
import { StepAgricultural } from './steps/StepAgricultural';
import { StepIdentification } from './steps/StepIdentification';
import { StepResults } from './steps/StepResults';



// --- ESTADO INICIAL VAZIO ---
const INITIAL_PROJECT_STATE: ProjectPayload = {
    currentStep: 0,
    status: 'Em Andamento',
    identification: {
        projectName: '', companyName: '', cnpj: '', state: '', city: '', 
        techResponsible: '', email: '', phone: ''
    },
    biomass: {
        type: 'Resíduo de Pinus', isResidue: true, moistureContent: 10
    },
    agricultural: {
        fertilizerN: 0, fertilizerP: 0, fertilizerK: 0, 
        limestone: 0, dieselPerHectare: 0, yieldPerHectare: 0
    },
    industrial: {
        electricityGrid: 0, electricitySelf: 0, biomassForHeat: 0, 
        distanceBiomassToFactory: 0
    },
    logistics: {
        domesticDistance: 0,
        domesticModes: { roadPercentage: 100, railPercentage: 0, waterPercentage: 0 },
        roadVehicleType: 'Carreta/Pesado (>32t)',
        isExported: false
    },
    production: {
        totalProductionVolume: 0
    }
};

export const CalculatorOrchestrator = () => {
    const navigate = useNavigate();
    
    // Estado Global do Projeto
    const [projectData, setProjectData] = useState<ProjectPayload>(INITIAL_PROJECT_STATE);
    const [isLoading, setIsLoading] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);

    // Atalho para o passo atual
    const currentStep = projectData.currentStep;

    // --- NAVEGAÇÃO E LÓGICA DE NEGÓCIO ---

    const handleUpdateData = (section: keyof ProjectPayload, data: any) => {
        setProjectData(prev => ({
            ...prev,
            [section]: { ...prev[section], ...data }
        }));
    };

    const nextStep = () => {
        let next = currentStep + 1;

        // REGRA DE NEGÓCIO: Pular Fase Agrícola se for Resíduo
        // Se estamos no Step 1 (Biomassa) e é resíduo, pulamos 2 e 3, indo para 4 (Indústria)
        if (currentStep === 1 && projectData.biomass.isResidue) {
            next = 4;
        }

        setProjectData(prev => ({ ...prev, currentStep: next }));
        window.scrollTo(0, 0);
    };

    const prevStep = () => {
        let prev = currentStep - 1;

        // REGRA DE NEGÓCIO: Retorno do Pulo
        // Se estamos no Step 4 e é resíduo, voltamos para o 1 (Biomassa)
        if (currentStep === 4 && projectData.biomass.isResidue) {
            prev = 1;
        }

        if (prev >= 0) {
            setProjectData(prevData => ({ ...prevData, currentStep: prev }));
            window.scrollTo(0, 0);
        }
    };

    const handleSaveAndExit = () => {
        // Aqui entraria a chamada para API (POST /projects)
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowSaveModal(true);
        }, 1000);
    };

    // --- RENDERIZAÇÃO DO CONTEÚDO ---

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
               return (
                <StepIdentification 
                    data={projectData.identification} 
                    onUpdate={(newData) => handleUpdateData('identification', newData)} 
                />
            );
            case 1:
               return (
                <StepBiomass 
                    data={projectData.biomass} 
                    onUpdate={(newData) => handleUpdateData('biomass', newData)} 
                />
               );
            // STEPS 2 & 3 (Agrícola)
            case 2:
            case 3:
                return (
                <StepAgricultural 
                    data={projectData.agricultural} 
                    onUpdate={(newData) => handleUpdateData('agricultural', newData)} 
                />
            );
            // STEPS 4, 5, 6, 7 (Industrial)
            case 4:
            case 5:
            case 6:
            case 7:
               return (
                <StepIndustrial 
                    data={projectData.industrial} 
                    onUpdate={(newData) => handleUpdateData('industrial', newData)} 
                />
            );
            // STEPS 8 & 9 (Logística)
            case 8:
            case 9:
                return (
                <StepLogistics 
                    data={projectData.logistics} 
                    onUpdate={(newData) => handleUpdateData('logistics', newData)} 
                />
            );
            case 10:
            return (
                <StepResults 
                    data={projectData.production} 
                    onUpdate={(newData) => handleUpdateData('production', newData)} 
                />
            );
            default:
                return <div>Passo desconhecido</div>;
        }
    };

    // --- UI HELPERS ---

    const getPhaseLabel = () => {
        if (currentStep === 0) return 'Identificação';
        if (currentStep <= 3) return 'Fase Agrícola';
        if (currentStep <= 7) return 'Fase Industrial';
        if (currentStep <= 9) return 'Distribuição';
        return 'Resultados';
    };

    const getProgressPercentage = () => {
        return Math.min(((currentStep) / 10) * 100, 100);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-20">
            {/* CABEÇALHO E PROGRESSO */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Novo Cálculo BioCalc</h1>
                    <p className="text-sm text-slate-500">
                        Etapa {currentStep === 0 ? 1 : currentStep} de 10: <span className="font-semibold text-emerald-600">{getPhaseLabel()}</span>
                    </p>
                </div>
                <Button variant="outline" icon={Save} onClick={handleSaveAndExit}>
                    Salvar Rascunho
                </Button>
            </div>

            {/* BARRA DE PROGRESSO */}
            <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6">
                <div 
                    className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                    style={{ width: `${getProgressPercentage()}%` }}
                ></div>
            </div>

            {/* ÍCONES DE FASE (Stepper Visual) */}
            <div className="flex justify-between px-4 mb-8 text-slate-400 hidden sm:flex">
                <div className={`flex flex-col items-center ${currentStep >= 0 ? 'text-emerald-600' : ''}`}>
                    <Leaf size={24} />
                    <span className="text-xs mt-1">Biomassa</span>
                </div>
                {/* Linha pontilhada condicional: Se for resíduo, fica "apagada" ou com ícone de skip */}
                <div className={`flex flex-col items-center ${currentStep >= 2 && !projectData.biomass.isResidue ? 'text-emerald-600' : (projectData.biomass.isResidue ? 'text-slate-300 opacity-50' : '')}`}>
                    <div className="relative">
                        <Factory size={24} />
                        {projectData.biomass.isResidue && <span className="absolute -top-2 -right-2 text-[10px] bg-slate-200 px-1 rounded">Skip</span>}
                    </div>
                    <span className="text-xs mt-1">Agrícola</span>
                </div>
                <div className={`flex flex-col items-center ${currentStep >= 4 ? 'text-emerald-600' : ''}`}>
                    <Factory size={24} />
                    <span className="text-xs mt-1">Industrial</span>
                </div>
                <div className={`flex flex-col items-center ${currentStep >= 8 ? 'text-emerald-600' : ''}`}>
                    <Truck size={24} />
                    <span className="text-xs mt-1">Logística</span>
                </div>
                <div className={`flex flex-col items-center ${currentStep === 10 ? 'text-emerald-600' : ''}`}>
                    <CalcIcon size={24} />
                    <span className="text-xs mt-1">Resultados</span>
                </div>
            </div>

            {/* ÁREA DE CONTEÚDO (Formulários) */}
            <Card className="min-h-[400px] border-t-4 border-t-emerald-500">
                {renderStepContent()}
            </Card>

            {/* FOOTER DE NAVEGAÇÃO FIXO */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-up md:static md:bg-transparent md:border-0 md:shadow-none md:p-0">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <Button 
                        variant="ghost" 
                        onClick={prevStep} 
                        disabled={currentStep === 0}
                        icon={ArrowLeft}
                    >
                        Voltar
                    </Button>

                    <div className="flex gap-2">
                         {/* Botão Próximo ou Calcular */}
                        {currentStep < 10 ? (
                            <Button onClick={nextStep} icon={ArrowRight}>
                                Próximo Passo
                            </Button>
                        ) : (
                            <Button variant="primary" className="bg-emerald-700 hover:bg-emerald-800" icon={CheckCircle}>
                                Calcular Resultados
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL DE SUCESSO (Mock) */}
            <Modal 
                isOpen={showSaveModal} 
                title="Projeto Salvo"
                onClose={() => setShowSaveModal(false)}
            >
                <div className="text-center py-6">
                    <CheckCircle className="mx-auto h-12 w-12 text-emerald-500 mb-4" />
                    <p className="text-lg text-slate-700">Seu progresso foi salvo com sucesso!</p>
                    <p className="text-sm text-slate-500 mt-2">Você pode continuar de onde parou acessando o Dashboard.</p>
                    <div className="mt-6">
                        <Button onClick={() => navigate('/dashboard')} className="w-full">
                            Ir para Dashboard
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};