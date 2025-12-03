import React, { useState, useEffect } from 'react';
import { Settings, Sprout, Truck, CheckCircle, AlertCircle, FileText, Save, ArrowRight, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Button, Input, Select, Card, Modal } from '../components/GenericComponents'; // Ajuste o import conforme sua estrutura

// --- MOCK DATA (Simulando a aba 'Dados auxiliares') ---
const BIOMASS_PROPERTIES: Record<string, { pci: number; source: string }> = {
    'Resíduo de Pinus': { pci: 18.8, source: 'Matheus et al. (2024)' },
    'Resíduo de Eucaliptus': { pci: 15.8, source: 'Matheus et al. (2024)' },
    'Casca de Amendoim': { pci: 16.5, source: 'Perea-Moreno et al. (2018)' },
    'Bagaço de Cana': { pci: 17.2, source: 'Literatura Padrão' },
    'Cavaco de Madeira': { pci: 18.5, source: 'Literatura Padrão' }
};

const BIOMASS_OPTIONS = Object.keys(BIOMASS_PROPERTIES);

const VEHICLE_OPTIONS = [
    'Caminhão Toco/Semipesado (16-32t)',
    'Carreta/Pesado (>32t)',
    'VUC (Urbano)',
    'Trem (Ferroviário Padrão)'
];

export const CalculatorPage = ({ onCancel }: { onCancel?: () => void }) => {
    const [step, setStep] = useState(1);
    const [showResultsModal, setShowResultsModal] = useState(false);
    const [isExport, setIsExport] = useState(false); // Toggle para seção de exportação

    // Estado único para todo o formulário
    const [formData, setFormData] = useState({
        // 1. Dados da Empresa (Aba EngS_BioCalc - Cabeçalho)
        companyName: '',
        cnpj: '',
        state: '',
        city: '',
        techResponsible: '',
        phone: '',
        email: '',
        projectName: 'Projeto BioCalc 01',

        // 2. Biomassa e Produção
        biomass: '',
        pci: '', // Azul claro (Automático)
        prodVolume: '', // Verde

        // 3. Logística - Mercado Doméstico
        dom_mass: '', // Verde
        dom_distance: '', // Verde
        dom_modal_road_pct: '100', // Verde
        dom_vehicle_type: '', // Verde

        // 3. Logística - Exportação (Opcional)
        exp_mass: '', // Verde
        exp_factory_port_dist: '', // Verde
        exp_modal_road_pct: '100', // Verde
        exp_modal_rail_pct: '0', // Verde
        exp_modal_water_pct: '0', // Verde
        exp_vehicle_port: '', // Verde
        exp_port_consumer_dist: '' // Verde
    });

    // Effect: Atualiza PCI automaticamente quando a biomassa muda (Célula Azul)
    useEffect(() => {
        if (formData.biomass && BIOMASS_PROPERTIES[formData.biomass]) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData(prev => ({
                ...prev,
                pci: BIOMASS_PROPERTIES[formData.biomass].pci.toString()
            }));
        } else {
            setFormData(prev => ({ ...prev, pci: '' }));
        }
    }, [formData.biomass]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    // --- ESTILOS AUXILIARES PARA AS CÉLULAS DA PLANILHA ---
    
/*     // Célula Verde Claro (Entrada de Dados)
    const inputGreenClass = "bg-emerald-50 border-emerald-200 focus:bg-white focus:border-emerald-500 transition-colors";
    
    // Célula Azul Claro (Cálculo Automático/Lookup)
    const inputBlueAutoClass = "bg-blue-50 border-blue-200 text-blue-800 font-medium cursor-not-allowed"; */

    return (
        <div className="max-w-5xl mx-auto pb-20">
            {/* Header da Página */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Novo Cálculo</h2>
                    <p className="text-sm text-slate-500">Preencha os dados conforme as células verdes da planilha original.</p>
                </div>
                <Button variant="outline" size="sm" onClick={onCancel}>Cancelar e Sair</Button>
            </div>

            {/* Stepper Visual */}
            <div className="flex items-center justify-between mb-8 px-4">
                {[
                    { id: 1, name: 'Empresa', icon: Settings },
                    { id: 2, name: 'Biomassa', icon: Sprout },
                    { id: 3, name: 'Logística', icon: Truck },
                    { id: 4, name: 'Resultados', icon: CheckCircle }
                ].map((s, idx, arr) => (
                    <div key={s.id} className="flex items-center flex-1">
                        <div className={`flex flex-col items-center ${step >= s.id ? 'text-emerald-600' : 'text-slate-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                                step >= s.id ? 'border-emerald-600 bg-emerald-50' : 'border-slate-300 bg-white'
                            }`}>
                                <s.icon size={20} />
                            </div>
                            <span className="text-xs font-medium mt-2">{s.name}</span>
                        </div>
                        {idx < arr.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-4 transition-all ${step > s.id ? 'bg-emerald-600' : 'bg-slate-200'}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* CONTEÚDO DO FORMULÁRIO */}
            <div className="space-y-6">

                {/* ETAPA 1: DADOS DA EMPRESA */}
                {step === 1 && (
                    <Card title="1. Identificação da Empresa e Projeto" className="animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input 
                                label="Nome do Projeto (Identificação Interna)" 
                                value={formData.projectName}
                                onChange={(e) => handleInputChange('projectName', e.target.value)}
                              
                            />
                            <Input 
                                label="Nome da Empresa" 
                                placeholder="Ex: BioEnergia S.A."
                                value={formData.companyName}
                                onChange={(e) => handleInputChange('companyName', e.target.value)}
                              
                            />
                            <Input 
                                label="CNPJ" 
                                placeholder="00.000.000/0000-00"
                                value={formData.cnpj}
                                onChange={(e) => handleInputChange('cnpj', e.target.value)}
                              
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input 
                                    label="Estado (UF)" 
                                    placeholder="SP"
                                    value={formData.state}
                                    onChange={(e) => handleInputChange('state', e.target.value)}
                                  
                                />
                                <Input 
                                    label="Cidade" 
                                    placeholder="São Paulo"
                                    value={formData.city}
                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                  
                                />
                            </div>
                            <Input 
                                label="Responsável Técnico" 
                                value={formData.techResponsible}
                                onChange={(e) => handleInputChange('techResponsible', e.target.value)}
                              
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input 
                                    label="Telefone" 
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                  
                                />
                                <Input 
                                    label="E-mail" 
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                  
                                />
                            </div>
                        </div>
                    </Card>
                )}

                {/* ETAPA 2: BIOMASSA E PRODUÇÃO */}
                {step === 2 && (
                    <Card title="2. Definição da Biomassa" className="animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Célula Verde: Seleção */}
                            <Select 
                                label="Biocombustível Sólido (Fonte de Biomassa)" 
                                options={BIOMASS_OPTIONS}
                                value={formData.biomass}
                                onChange={(e) => handleInputChange('biomass', e.target.value)}
                              
                            />

                            {/* Célula Azul: Automático */}
                            <div className="relative">
                                <Input 
                                    label="PCI (Poder Calorífico Inferior) - MJ/kg" 
                                    value={formData.pci}
                                    readOnly={true}
                                    helpText="Dado preenchido automaticamente com base na referência bibliográfica (Matheus et al.)."
                                />
                                <Info size={16} className="absolute top-8 right-3 text-blue-400" />
                            </div>

                            {/* Célula Verde: Input Numérico */}
                            <Input 
                                label="Volume de Produção Elegível (t/ano)" 
                                type="number" 
                                value={formData.prodVolume}
                                onChange={(e) => handleInputChange('prodVolume', e.target.value)}
                              
                                helpText="Quantidade total produzida no ano base para certificação."
                            />
                            
                            {/* Nota informativa */}
                            <div className="md:col-span-2 bg-blue-50 p-4 rounded-md border border-blue-100 flex gap-3">
                                <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={20} />
                                <div className="text-sm text-blue-800">
                                    <p className="font-semibold mb-1">Nota sobre Emissões Agrícolas:</p>
                                    <p>Para resíduos (ex: casca de amendoim, resíduo florestal), a carga de emissões da fase agrícola é considerada nula ou alocada conforme CFF. Para culturas dedicadas, as emissões de fertilizantes são calculadas internamente.</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {/* ETAPA 3: LOGÍSTICA */}
                {step === 3 && (
                    <div className="space-y-6 animate-fadeIn">
                        {/* 3.1 Mercado Doméstico */}
                        <Card title="3.1 Distribuição - Mercado Doméstico">
                            <p className="text-sm text-slate-500 mb-4">Preencha os dados referentes ao transporte da fábrica até o consumidor final no Brasil.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Input 
                                    label="Qtd. Transportada (kg/ano)" 
                                    type="number"
                                    value={formData.dom_mass}
                                    onChange={(e) => handleInputChange('dom_mass', e.target.value)}
                                  
                                />
                                <Input 
                                    label="Distância Média (km)" 
                                    type="number"
                                    value={formData.dom_distance}
                                    onChange={(e) => handleInputChange('dom_distance', e.target.value)}
                                  
                                />
                                <Input 
                                    label="% Modal Rodoviário" 
                                    type="number"
                                    value={formData.dom_modal_road_pct}
                                    onChange={(e) => handleInputChange('dom_modal_road_pct', e.target.value)}
                                  
                                />
                                <Select 
                                    label="Tipo de Veículo"
                                    options={VEHICLE_OPTIONS}
                                    value={formData.dom_vehicle_type}
                                    onChange={(e) => handleInputChange('dom_vehicle_type', e.target.value)}
                                  
                                />
                            </div>
                        </Card>

                        {/* 3.2 Exportação (Toggle) */}
                        <Card className="border-l-4 border-l-amber-400">
                            <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setIsExport(!isExport)}>
                                <div>
                                    <h3 className="text-lg font-medium text-slate-900">3.2 Exportação (Opcional)</h3>
                                    <p className="text-sm text-slate-500">Caso o produto seja exportado via container marítimo.</p>
                                </div>
                                <button type="button" className="text-slate-400 hover:text-slate-600">
                                    {isExport ? <ChevronUp /> : <ChevronDown />}
                                </button>
                            </div>

                            {isExport && (
                                <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">Fábrica até Porto</h4>
                                    </div>
                                    
                                    <Input 
                                        label="Qtd. Exportada (t/ano)" 
                                        type="number"
                                        value={formData.exp_mass}
                                        onChange={(e) => handleInputChange('exp_mass', e.target.value)}
                                      
                                    />
                                    <Input 
                                        label="Distância até Porto (km)" 
                                        type="number"
                                        value={formData.exp_factory_port_dist}
                                        onChange={(e) => handleInputChange('exp_factory_port_dist', e.target.value)}
                                      
                                        helpText="Consulta pode ser efetuada no site: gov.br"
                                    />
                                    
                                    <div className="grid grid-cols-3 gap-2 md:col-span-2">
                                        <Input 
                                            label="% Rodoviário" 
                                            type="number" 
                                            value={formData.exp_modal_road_pct}
                                            onChange={(e) => handleInputChange('exp_modal_road_pct', e.target.value)}
                                          
                                        />
                                        <Input 
                                            label="% Ferroviário" 
                                            type="number" 
                                            value={formData.exp_modal_rail_pct}
                                            onChange={(e) => handleInputChange('exp_modal_rail_pct', e.target.value)}
                                          
                                        />
                                        <Input 
                                            label="% Hidroviário" 
                                            type="number" 
                                            value={formData.exp_modal_water_pct}
                                            onChange={(e) => handleInputChange('exp_modal_water_pct', e.target.value)}
                                          
                                        />
                                    </div>

                                    <Select 
                                        label="Veículo Rodoviário (Porto)"
                                        options={VEHICLE_OPTIONS}
                                        value={formData.exp_vehicle_port}
                                        onChange={(e) => handleInputChange('exp_vehicle_port', e.target.value)}
                                    />

                                    <div className="md:col-span-2 mt-4">
                                        <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">Porto até Consumidor Final</h4>
                                        <Input 
                                            label="Distância Marítima (km)" 
                                            type="number"
                                            value={formData.exp_port_consumer_dist}
                                            onChange={(e) => handleInputChange('exp_port_consumer_dist', e.target.value)}
                                            helpText="Consulta pode ser efetuada no site: searates.com"
                                        />
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>
                )}

                {/* ETAPA 4: RESULTADOS */}
                {step === 4 && (
                    <div className="space-y-6 animate-fadeIn">
                        {/* Cabeçalho de Resultados (Estilo Azul Escuro - Célula de Resultado) */}
                        <div className="bg-slate-800 text-white rounded-lg p-8 shadow-xl">
                            <h3 className="text-lg font-medium opacity-80 mb-6 border-b border-slate-700 pb-2">Resultados Consolidados (BioCalc)</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div>
                                    <p className="text-sm text-slate-400 mb-1">Intensidade de Carbono</p>
                                    <div className="text-4xl font-bold text-white">0.0026</div>
                                    <span className="text-xs bg-slate-700 px-2 py-1 rounded mt-2 inline-block">kg CO₂eq/MJ</span>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400 mb-1">Nota de Eficiência</p>
                                    <div className="text-4xl font-bold text-emerald-400">92.5%</div>
                                    <span className="text-xs text-slate-400">vs Fóssil Substituto</span>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400 mb-1">CBIOs Gerados</p>
                                    <div className="text-4xl font-bold text-blue-400">18,982</div>
                                    <span className="text-xs text-slate-400">Créditos Potenciais</span>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400 mb-1">Emissões Totais</p>
                                    <div className="text-4xl font-bold text-amber-400">420.5</div>
                                    <span className="text-xs text-slate-400">t CO₂eq/ano</span>
                                </div>
                            </div>
                        </div>

                        {/* Detalhamento por Fase */}
                        <Card title="Detalhamento do Ciclo de Vida (Contribuição)">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Etapa</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Emissão (gCO₂eq/MJ)</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">% Contribuição</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Agrícola</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-emerald-600">-0.0064</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">-2.5%</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Industrial</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">0.0009</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">0.35%</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Transporte</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-amber-600">0.0077</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">3.02%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
                                <Button variant="outline" icon={FileText}>Exportar Relatório PDF</Button>
                                <Button icon={Save} onClick={() => setShowResultsModal(true)}>Salvar Projeto</Button>
                            </div>
                        </Card>
                    </div>
                )}
            </div>

            {/* Navegação Inferior */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:pl-72 z-10">
                <div className="max-w-5xl mx-auto flex justify-between">
                    <Button 
                        variant="ghost" 
                        onClick={handleBack} 
                        disabled={step === 1}
                    >
                        Voltar
                    </Button>
                    
                    {step < 4 ? (
                        <Button onClick={handleNext} icon={ArrowRight}>
                            Próximo Passo
                        </Button>
                    ) : null}
                </div>
            </div>

            {/* Modal de Sucesso */}
            <Modal 
                isOpen={showResultsModal} 
                onClose={() => setShowResultsModal(false)}
                title="Projeto Salvo"
                footer={
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    <Button onClick={() => { setShowResultsModal(false); onCancel && onCancel(); }}>
                        Voltar ao Dashboard
                    </Button>
                }
            >
                <div className="text-center py-4">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 mb-4">
                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                    </div>
                    <p className="text-sm text-slate-500">
                        O projeto <strong>{formData.projectName}</strong> foi salvo com sucesso!
                    </p>
                </div>
            </Modal>
        </div>
    );
};