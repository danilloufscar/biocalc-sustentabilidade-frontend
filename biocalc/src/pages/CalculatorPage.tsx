import  { useState } from 'react';
import { Settings, Sprout, Truck, CheckCircle, AlertCircle, FileText, Save, ArrowRight } from 'lucide-react';
import { Button, Input, Select, Card, Modal } from '@/components/GenericComponents';
import { BIOMASS_OPTIONS } from '@/mock/mockedData';

export const CalculatorPage = ({ onCancel }: { onCancel: () => void }) => {
    const [step, setStep] = useState(1);
    const [showResultsModal, setShowResultsModal] = useState(false);

    const [formData, setFormData] = useState({
        projectName: 'Nova Análise 2024',
        biomass: '',
        prodVolume: '12000',
        distanceToPort: '410',
        transportModal: 'Rodoviário'
    });

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);
    
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Novo Cálculo BioCalc</h2>
                <Button variant="outline" size="sm" onClick={onCancel}>Cancelar</Button>
            </div>

             <div className="flex items-center justify-between mb-8">
            {[
                { id: 1, name: 'Geral', icon: Settings },
                { id: 2, name: 'Produção', icon: Sprout },
                { id: 3, name: 'Transporte', icon: Truck },
                { id: 4, name: 'Resultados', icon: CheckCircle }
            ].map((s, idx, arr) => (
                <div key={s.id} className="flex items-center flex-1">
                    <div className={`flex flex-col items-center ${step >= s.id ? 'text-emerald-600' : 'text-slate-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                            step >= s.id ? 'border-emerald-600 bg-emerald-50' : 'border-slate-300 bg-white'
                        }`}>
                            <s.icon size={20} />
                        </div>
                        <span className="text-xs font-medium mt-2">{s.name}</span>
                    </div>
                    {idx < arr.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-4 ${step > s.id ? 'bg-emerald-600' : 'bg-slate-200'}`} />
                    )}
                </div>
            ))}
        </div>

            <div className="space-y-6">
                {step === 1 && (
                    <Card title="1. Informações do Projeto e Empresa" className="animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input 
                                label="Nome do Projeto" 
                                value={formData.projectName} 
                                onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                            />
                            <Input label="Responsável Técnico" placeholder="Eng. Responsável" />
                            <Input label="CNPJ da Unidade Produtora" placeholder="00.000.000/0001-00" />
                            <Input label="Cidade / Estado" placeholder="São Paulo - SP" />
                        </div>
                    </Card>
                )}

                {step === 2 && (
                    <Card title="2. Dados da Biomassa e Produção" className="animate-fadeIn">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Select 
                                label="Fonte de Biomassa (Matéria-prima)" 
                                options={BIOMASS_OPTIONS}
                                value={formData.biomass}
                                onChange={(e) => setFormData({...formData, biomass: e.target.value})}
                            />
                            <Input 
                                label="Volume de Produção Elegível (ton/ano)" 
                                type="number" 
                                value={formData.prodVolume}
                                helpText="Quantidade total de pellets ou briquetes produzidos no ano base."
                                onChange={(e) => setFormData({...formData, prodVolume: e.target.value})}
                            />
                            <div className="md:col-span-2 p-4 bg-blue-50 rounded-md border border-blue-100 flex gap-3">
                                <AlertCircle className="text-blue-600 shrink-0" />
                                <div className="text-sm text-blue-800">
                                    <p className="font-semibold">Nota Técnica:</p>
                                    <p>Os valores de PCI (Poder Calorífico Inferior) serão carregados automaticamente com base na biomassa selecionada conforme Matheus et al. (2024).</p>
                                </div>
                            </div>
                         </div>
                    </Card>
                )}

                {step === 3 && (
                    <Card title="3. Logística e Distribuição" className="animate-fadeIn">
                        <div className="space-y-6">
                            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider border-b pb-2">Mercado Doméstico</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Input label="Distância Média (km)" type="number" placeholder="0" />
                                <Select label="Modal Principal" options={['Rodoviário', 'Ferroviário']} />
                                <Input label="% do Volume" type="number" placeholder="100" />
                            </div>

                            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider border-b pb-2 pt-4">Exportação (Porto)</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input 
                                    label="Distância Fábrica -> Porto (km)" 
                                    type="number"
                                    value={formData.distanceToPort}
                                    onChange={(e) => setFormData({...formData, distanceToPort: e.target.value})}
                                />
                                <Select label="Tipo de Veículo" options={['Caminhão 16-32t', 'Caminhão >32t', 'Trem']} />
                            </div>
                        </div>
                    </Card>
                )}

                {step === 4 && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="bg-emerald-900 text-white rounded-lg p-6 shadow-lg">
                            <h3 className="text-lg font-medium opacity-90 mb-6">Resultados Preliminares</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                <div>
                                    <div className="text-4xl font-bold mb-1">0.0026</div>
                                    <div className="text-sm opacity-75">Intensidade de Carbono (kg CO₂eq/MJ)</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold mb-1">92.5%</div>
                                    <div className="text-sm opacity-75">Redução de Emissões vs Fóssil</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold mb-1 text-emerald-400">18,982</div>
                                    <div className="text-sm opacity-75">Potencial de CBIOs</div>
                                </div>
                            </div>
                        </div>

                        <Card title="Detalhamento por Etapa (Ciclo de Vida)">
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                                            Agrícola (-2.5%)
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-semibold inline-block text-emerald-600">
                                            Crédito de Carbono
                                        </span>
                                    </div>
                                </div>
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                            Transporte (85%)
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-emerald-100">
                                    <div style={{ width: "10%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-slate-400"></div>
                                    <div style={{ width: "85%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                                    <div style={{ width: "5%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"></div>
                                </div>
                                <div className="flex justify-between text-xs text-slate-500">
                                    <span>Industrial (10%)</span>
                                    <span>Transporte (85%)</span>
                                    <span>Uso (5%)</span>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end gap-3">
                                <Button variant="outline" icon={FileText}>Exportar Relatório PDF</Button>
                                <Button icon={Save} onClick={() => setShowResultsModal(true)}>Salvar Projeto</Button>
                            </div>
                        </Card>
                    </div>
                )}

                {/* Footer Navigation */}
                <div className="flex justify-between pt-6 border-t border-slate-200 mt-6">
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

            <Modal 
                isOpen={showResultsModal} 
                onClose={() => setShowResultsModal(false)}
                title="Projeto Salvo com Sucesso!"
                footer={
                    <Button onClick={() => { setShowResultsModal(false); onCancel(); }}>
                        Voltar ao Dashboard
                    </Button>
                }
            >
                <div className="text-center py-4">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 mb-4">
                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                    </div>
                    <p className="text-sm text-slate-500">
                        O projeto <strong>{formData.projectName}</strong> foi salvo e os CBIOs foram calculados. Você pode acessá-lo na aba "Meus Projetos".
                    </p>
                </div>
            </Modal>
        </div>
    );
};