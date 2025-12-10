import { useState } from 'react';
import {
    ArrowRight,
    ArrowLeft,
    Save,
    CheckCircle,
    Leaf,
    Factory,
    Truck,
    Zap,
    Fuel,
    Droplet,
    Ship,
    Package,
    MapPin,
    Calculator as CalcIcon,
    AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { ProjectPayload } from '@/Types/Types';
import { Button, Card, Modal } from '../../components/GenericComponents';
import { createProject, updateProjectStep, calculateResults } from '../../services/projectApi';

// Import all step components
import { StepIdentification } from './steps/StepIdentification';
import { Step1BiomassProduction } from './steps/Step1BiomassProduction';
import { Step2MUT } from './steps/Step2MUT';
import { Step3BiomassTransport } from './steps/Step3BiomassTransport';
import { Step4IndustrialSystem } from './steps/Step4IndustrialSystem';
import { Step5Electricity } from './steps/Step5Electricity';
import { Step6Fuels } from './steps/Step6Fuels';
import { Step7OtherInputs } from './steps/Step7OtherInputs';
import { Step8DomesticTransport } from './steps/Step8DomesticTransport';
import { Step9ExportTransport } from './steps/Step9ExportTransport';
import { Step10ProductionVolume } from './steps/Step10ProductionVolume';
import { ResultsPage } from './ResultsPage';

// --- ESTADO INICIAL VAZIO ---
const INITIAL_PROJECT_STATE: ProjectPayload = {
    currentStep: 0,
    status: 'Em Rascunho',
    identification: {
        name: '',
        company_name: '',
        cnpj: '',
        state: '',
        city: '',
        tech_responsible: '',
        email: '',
        phone: ''
    },
    step1: {
        biomass_type: 'Resíduo de Pinus',
        biomass_consumption_known: 'Não',
        starch_input: 0
    },
    step2: {
        production_state: undefined,
        wood_residue_stage: 'Não se aplica'
    },
    step3: {
        agr_transport_distance: 0,
        agr_transport_vehicle: 'Caminhão Toco/Semipesado (16-32t)'
    },
    step4: {
        has_cogeneration: 'Não',
        biomass_processed: 0,
        biomass_cogeneration: 0
    },
    step5: {
        elec_grid: 0,
        elec_solar: 0,
        elec_wind: 0,
        elec_hydro: 0,
        elec_biomass: 0,
        elec_other: 0
    },
    step6: {
        fuel_diesel: 0,
        fuel_gasoline: 0,
        fuel_ethanol: 0,
        fuel_biodiesel: 0,
        fuel_gnv: 0,
        fuel_lpg: 0,
        fuel_biomass: 0,
        fuel_other: 0
    },
    step7: {
        water_consumption: 0,
        input_lubricant: 0,
        input_chemical: 0,
        input_other: 0
    },
    step8: {
        dom_mass: 0,
        dom_distance: 0,
        dom_modal_road_pct: 100,
        dom_modal_rail_pct: 0,
        dom_vehicle_type: 'Caminhão Toco/Semipesado (16-32t)'
    },
    step9: {
        exp_mass: 0,
        exp_factory_port_dist: 0,
        exp_modal_road_pct: 100,
        exp_modal_rail_pct: 0,
        exp_modal_water_pct: 0,
        exp_vehicle_port: undefined,
        exp_port_consumer_dist: 0
    },
    step10: {
        production_volume: 0
    }
};

export const CalculatorOrchestrator = () => {
    const navigate = useNavigate();

    // Estado Global do Projeto
    const [projectData, setProjectData] = useState<ProjectPayload>(INITIAL_PROJECT_STATE);
    const [projectId, setProjectId] = useState<number | null>(null);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showResults, setShowResults] = useState(false);
    const [calculationResults, setCalculationResults] = useState<any>(null);

    // Atalho para o passo atual
    const currentStep = projectData.currentStep;

    // --- NAVEGAÇÃO E LÓGICA DE NEGÓCIO ---

    const handleUpdateData = (section: keyof ProjectPayload, data: any) => {
        setProjectData(prev => {
            const currentValue = prev[section];
            // Check if the current value is an object (not null, not array, not primitive)
            const newValue = typeof currentValue === 'object' && currentValue !== null && !Array.isArray(currentValue)
                ? { ...currentValue, ...data }
                : data;

            console.log(`Atualizando ${section}:`, newValue);

            return {
                ...prev,
                [section]: newValue
            };
        });
    };

    const nextStep = async () => {
        setError(null);
        setIsLoading(true);

        try {
            // Step 0: Criar projeto
            if (currentStep === 0) {
                const response = await createProject(projectData.identification);
                setProjectId(response.id);
                console.log('Projeto criado:', response);
            }
            // Steps 1-10: Atualizar step ATUAL antes de avançar
            else if (currentStep >= 1 && currentStep <= 10 && projectId) {
                const stepData = projectData[`step${currentStep}` as keyof ProjectPayload];
                console.log(`Salvando step ${currentStep} com dados:`, stepData);
                const response = await updateProjectStep(projectId, currentStep, stepData);
                console.log(`Step ${currentStep} atualizado:`, response);
            }

            // Avançar para o próximo step
            if (currentStep < 10) {
                setProjectData(prev => ({ ...prev, currentStep: currentStep + 1 }));
                window.scrollTo(0, 0);
            }
        } catch (err: any) {
            console.error('Erro ao salvar step:', err);
            setError(err.message || 'Erro ao salvar dados. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setProjectData(prev => ({ ...prev, currentStep: currentStep - 1 }));
            window.scrollTo(0, 0);
        }
    };

    const handleSaveAndExit = async () => {
        setError(null);
        setIsLoading(true);

        try {
            // Se ainda não criou o projeto, criar
            if (currentStep === 0) {
                const response = await createProject(projectData.identification);
                setProjectId(response.id);
                console.log('Projeto criado e salvo:', response);
            }
            // Se já tem projeto, atualizar o step atual
            else if (projectId && currentStep >= 1 && currentStep <= 10) {
                const stepData = projectData[`step${currentStep} ` as keyof ProjectPayload];
                const response = await updateProjectStep(projectId, currentStep, stepData);
                console.log(`Step ${currentStep} salvo: `, response);
            }

            setShowSaveModal(true);
        } catch (err: any) {
            console.error('Erro ao salvar:', err);
            setError(err.message || 'Erro ao salvar. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCalculate = async () => {
        if (!projectId) {
            setError('Projeto não foi criado ainda.');
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            // Primeiro, salvar o step 10 (volume de produção)
            const stepData = projectData.step10;
            await updateProjectStep(projectId, 10, stepData);
            console.log('Step 10 salvo');

            // Depois, calcular resultados
            const response = await calculateResults(projectId);
            console.log('Resultados calculados:', response);

            // Armazenar resultados e mostrar tela de resultados
            setCalculationResults(response);
            setShowResults(true);
        } catch (err: any) {
            console.error('Erro ao calcular:', err);
            setError(err.message || 'Erro ao calcular resultados. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
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
                    <Step1BiomassProduction
                        data={projectData.step1!}
                        onUpdate={(newData) => handleUpdateData('step1', newData)}
                    />
                );
            case 2:
                return (
                    <Step2MUT
                        data={projectData.step2!}
                        onUpdate={(newData) => handleUpdateData('step2', newData)}
                    />
                );
            case 3:
                return (
                    <Step3BiomassTransport
                        data={projectData.step3!}
                        onUpdate={(newData) => handleUpdateData('step3', newData)}
                    />
                );
            case 4:
                return (
                    <Step4IndustrialSystem
                        data={projectData.step4!}
                        onUpdate={(newData) => handleUpdateData('step4', newData)}
                    />
                );
            case 5:
                return (
                    <Step5Electricity
                        data={projectData.step5!}
                        onUpdate={(newData) => handleUpdateData('step5', newData)}
                    />
                );
            case 6:
                return (
                    <Step6Fuels
                        data={projectData.step6!}
                        onUpdate={(newData) => handleUpdateData('step6', newData)}
                    />
                );
            case 7:
                return (
                    <Step7OtherInputs
                        data={projectData.step7!}
                        onUpdate={(newData) => handleUpdateData('step7', newData)}
                    />
                );
            case 8:
                return (
                    <Step8DomesticTransport
                        data={projectData.step8!}
                        onUpdate={(newData) => handleUpdateData('step8', newData)}
                    />
                );
            case 9:
                return (
                    <Step9ExportTransport
                        data={projectData.step9!}
                        onUpdate={(newData) => handleUpdateData('step9', newData)}
                    />
                );
            case 10:
                return (
                    <Step10ProductionVolume
                        data={projectData.step10!}
                        onUpdate={(newData) => handleUpdateData('step10', newData)}
                    />
                );
            default:
                return <div>Passo desconhecido</div>;
        }
    };

    // --- UI HELPERS ---

    const getStepInfo = () => {
        const stepMap = [
            { phase: 'Identificação', icon: CalcIcon, color: 'emerald' },
            { phase: 'Fase Agrícola - Biomassa', icon: Leaf, color: 'emerald' },
            { phase: 'Fase Agrícola - MUT', icon: MapPin, color: 'emerald' },
            { phase: 'Fase Agrícola - Transporte', icon: Truck, color: 'emerald' },
            { phase: 'Fase Industrial - Sistema', icon: Factory, color: 'blue' },
            { phase: 'Fase Industrial - Eletricidade', icon: Zap, color: 'yellow' },
            { phase: 'Fase Industrial - Combustíveis', icon: Fuel, color: 'orange' },
            { phase: 'Fase Industrial - Insumos', icon: Droplet, color: 'cyan' },
            { phase: 'Distribuição - Doméstico', icon: Truck, color: 'purple' },
            { phase: 'Distribuição - Exportação', icon: Ship, color: 'indigo' },
            { phase: 'Volume de Produção', icon: Package, color: 'green' }
        ];

        return stepMap[currentStep] || stepMap[0];
    };

    const getProgressPercentage = () => {
        return (currentStep / 10) * 100;
    };

    const stepInfo = getStepInfo();

    // Se os resultados foram calculados, mostrar a página de resultados
    if (showResults && calculationResults) {
        return (
            <ResultsPage
                results={calculationResults}
                projectName={projectData.identification.name || 'Projeto BioCalc'}
                onNewCalculation={() => {
                    setShowResults(false);
                    setCalculationResults(null);
                    setProjectData(INITIAL_PROJECT_STATE);
                    setProjectId(null);
                }}
            />
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-20">
            {/* CABEÇALHO E PROGRESSO */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Novo Cálculo BioCalc</h1>
                    <p className="text-sm text-slate-500">
                        Etapa {currentStep + 1} de 11: <span className={`font-semibold text-${stepInfo.color}-600`}>{stepInfo.phase}</span>
                    </p>
                </div>
            </div>

            {/* BARRA DE PROGRESSO */}
            <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6">
                <div
                    className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${getProgressPercentage()}%` }}
                ></div>
            </div>

            {/* ERRO */}
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                        <div>
                            <h3 className="text-sm font-medium text-red-800">Erro</h3>
                            <p className="text-sm text-red-700 mt-1">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* STEPPER VISUAL DETALHADO */}
            <div className="hidden lg:block mb-8">
                <div className="flex justify-between items-start text-xs">
                    {/* Step 0 */}
                    <div className={`flex flex-col items-center ${currentStep >= 0 ? 'text-emerald-600' : 'text-slate-400'} `}>
                        <CalcIcon size={20} />
                        <span className="mt-1 text-center w-16">Identificação</span>
                    </div>

                    {/* Steps 1-3: Agrícola */}
                    <div className={`flex flex - col items - center ${currentStep >= 1 ? 'text-emerald-600' : 'text-slate-400'} `}>
                        <Leaf size={20} />
                        <span className="mt-1 text-center w-16">Biomassa</span>
                    </div>
                    <div className={`flex flex - col items - center ${currentStep >= 2 ? 'text-emerald-600' : 'text-slate-400'} `}>
                        <MapPin size={20} />
                        <span className="mt-1 text-center w-16">MUT</span>
                    </div>
                    <div className={`flex flex - col items - center ${currentStep >= 3 ? 'text-emerald-600' : 'text-slate-400'} `}>
                        <Truck size={20} />
                        <span className="mt-1 text-center w-16">Transporte</span>
                    </div>

                    {/* Steps 4-7: Industrial */}
                    <div className={`flex flex - col items - center ${currentStep >= 4 ? 'text-blue-600' : 'text-slate-400'} `}>
                        <Factory size={20} />
                        <span className="mt-1 text-center w-16">Sistema</span>
                    </div>
                    <div className={`flex flex - col items - center ${currentStep >= 5 ? 'text-yellow-600' : 'text-slate-400'} `}>
                        <Zap size={20} />
                        <span className="mt-1 text-center w-16">Eletricidade</span>
                    </div>
                    <div className={`flex flex - col items - center ${currentStep >= 6 ? 'text-orange-600' : 'text-slate-400'} `}>
                        <Fuel size={20} />
                        <span className="mt-1 text-center w-16">Combustíveis</span>
                    </div>
                    <div className={`flex flex - col items - center ${currentStep >= 7 ? 'text-cyan-600' : 'text-slate-400'} `}>
                        <Droplet size={20} />
                        <span className="mt-1 text-center w-16">Insumos</span>
                    </div>

                    {/* Steps 8-9: Distribuição */}
                    <div className={`flex flex - col items - center ${currentStep >= 8 ? 'text-purple-600' : 'text-slate-400'} `}>
                        <Truck size={20} />
                        <span className="mt-1 text-center w-16">Doméstico</span>
                    </div>
                    <div className={`flex flex - col items - center ${currentStep >= 9 ? 'text-indigo-600' : 'text-slate-400'} `}>
                        <Ship size={20} />
                        <span className="mt-1 text-center w-16">Exportação</span>
                    </div>

                    {/* Step 10 */}
                    <div className={`flex flex - col items - center ${currentStep >= 10 ? 'text-green-600' : 'text-slate-400'} `}>
                        <Package size={20} />
                        <span className="mt-1 text-center w-16">Volume</span>
                    </div>
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
                            <Button onClick={nextStep} icon={ArrowRight} disabled={isLoading}>
                                {isLoading ? 'Salvando...' : 'Próximo Passo'}
                            </Button>
                        ) : (
                            <Button
                                variant="primary"
                                className="bg-emerald-700 hover:bg-emerald-800"
                                icon={CheckCircle}
                                onClick={handleCalculate}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Calculando...' : 'Calcular Resultados'}
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