import React, { useState } from 'react';
import { Calculator, TrendingUp, Leaf, BarChart3, Download } from 'lucide-react';
import { Input, Button, Card } from '@/components/GenericComponents';
import { Step10ProductionVolumeData } from '@/Types/Types';

interface StepResultsProps {
    data: Step10ProductionVolumeData;
    onUpdate: (data: Partial<Step10ProductionVolumeData>) => void;
}

export const StepResults: React.FC<StepResultsProps> = ({ data, onUpdate }) => {
    const [isCalculated, setIsCalculated] = useState(false);

    // --- MOCK CALCULATION LOGIC (Simulação enquanto não ligamos o Python) ---
    // Valores baseados na planilha BioCalc_EngS.xlsx
    const FOSSIL_COMPARATOR = 86.7; // gCO2eq/MJ (Mix Diesel/Gasolina)
    const MOCK_BIO_IC = 2.55;       // gCO2eq/MJ (Exemplo de Pellet eficiente)
    const LHV_PELLET = 18.8;        // MJ/kg (Poder Calorífico)

    // Resultados calculados dinamicamente
    const reductionPercentage = ((FOSSIL_COMPARATOR - MOCK_BIO_IC) / FOSSIL_COMPARATOR) * 100;
    const energyContent = (data.production_volume * 1000) * LHV_PELLET; // em MJ
    const avoidedEmissions = (energyContent * (FOSSIL_COMPARATOR - MOCK_BIO_IC)) / 1000000; // tCO2eq
    const estimatedCBIOs = Math.floor(avoidedEmissions); // 1 CBIO = 1 ton CO2 evitada

    const handleCalculate = () => {
        if (data.production_volume > 0) {
            setIsCalculated(true);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* BLOCO 1: Input Final de Volume */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row items-end gap-4">
                    <div className="flex-grow w-full">
                        <div className="flex items-center gap-2 mb-2">
                            <Calculator className="text-emerald-600" size={20} />
                            <h3 className="font-semibold text-slate-800">Volume Total de Produção Elegível</h3>
                        </div>
                        <Input
                            label="Produção Anual (Toneladas)"
                            placeholder="Ex: 12000"
                            type="number"
                            value={data.production_volume?.toString() || '0'}
                            onChange={(e) => {
                                onUpdate({ production_volume: parseFloat(e.target.value) || 0 });
                                setIsCalculated(false); // Reseta se mudar o valor
                            }}
                            helpText="Quantidade de pellets/briquetes comercializada no período."
                        />
                    </div>
                    <div className="w-full md:w-auto pb-1">
                        <Button
                            onClick={handleCalculate}
                            disabled={!data.production_volume}
                            className="w-full md:w-auto h-[42px]"
                            icon={BarChart3}
                        >
                            Simular Resultados
                        </Button>
                    </div>
                </div>
            </div>

            {/* BLOCO 2: Dashboard de Resultados (Condicional) */}
            {isCalculated && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">

                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900">Resultado Preliminar</h2>
                        <span className="text-xs font-mono bg-yellow-100 text-yellow-800 px-2 py-1 rounded">SIMULAÇÃO FRONTEND</span>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Intensidade de Carbono */}
                        <Card className="border-l-4 border-l-blue-500 bg-blue-50/20">
                            <p className="text-sm font-medium text-slate-500 mb-1">Intensidade de Carbono (IC)</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-slate-900">{MOCK_BIO_IC.toFixed(2)}</span>
                                <span className="text-xs text-slate-500">gCO₂eq/MJ</span>
                            </div>
                            <div className="mt-2 text-xs text-blue-600 font-medium">
                                Nota de Eficiência: {(100 - (MOCK_BIO_IC / FOSSIL_COMPARATOR) * 100).toFixed(1)}
                            </div>
                        </Card>

                        {/* % de Redução */}
                        <Card className="border-l-4 border-l-emerald-500 bg-emerald-50/20">
                            <p className="text-sm font-medium text-slate-500 mb-1">Redução de Emissões</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-emerald-700">{reductionPercentage.toFixed(1)}%</span>
                                <TrendingUp size={16} className="text-emerald-600" />
                            </div>
                            <div className="mt-2 text-xs text-slate-500">
                                Comparado ao Fóssil (86.7 gCO₂eq/MJ)
                            </div>
                        </Card>

                        {/* CBIOs Estimados */}
                        <Card className="border-l-4 border-l-yellow-500 bg-yellow-50/20 shadow-md transform scale-105 border border-yellow-200">
                            <p className="text-sm font-bold text-yellow-700 mb-1 flex items-center gap-1">
                                <Leaf size={14} /> Potencial de CBIOs
                            </p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-extrabold text-slate-900">{estimatedCBIOs.toLocaleString()}</span>
                                <span className="text-xs text-slate-500">unidades</span>
                            </div>
                            <div className="mt-2 text-xs text-yellow-800">
                                Receita Est. (R$ 100/CBIO): <strong>R$ {(estimatedCBIOs * 100).toLocaleString()}</strong>
                            </div>
                        </Card>
                    </div>

                    {/* Gráfico de Barras Comparativo (CSS Puro) */}
                    <Card title="Comparativo: Biocombustível vs Fóssil">
                        <div className="mt-4 space-y-6">
                            {/* Barra Fóssil */}
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-slate-700">Combustível Fóssil (Referência)</span>
                                    <span className="text-slate-500">{FOSSIL_COMPARATOR} gCO₂eq/MJ</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-6">
                                    <div className="bg-slate-400 h-6 rounded-full w-full relative"></div>
                                </div>
                            </div>

                            {/* Barra BioCalc */}
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-bold text-emerald-700">Seu Biocombustível (BioCalc)</span>
                                    <span className="font-bold text-emerald-700">{MOCK_BIO_IC.toFixed(2)} gCO₂eq/MJ</span>
                                </div>
                                <div className="w-full bg-emerald-100 rounded-full h-6 relative">
                                    <div
                                        className="bg-emerald-500 h-6 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold transition-all duration-1000"
                                        style={{ width: `${(MOCK_BIO_IC / FOSSIL_COMPARATOR) * 100}%` }}
                                    >
                                    </div>
                                    {/* Seta de Redução */}
                                    <div className="absolute top-0 right-0 h-full flex items-center pr-4">
                                        <span className="text-xs text-emerald-800 font-semibold ml-2">
                                            -{reductionPercentage.toFixed(0)}% Emissões
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                            <Button variant="outline" icon={Download} onClick={() => alert("Funcionalidade de PDF será implementada no backend Python.")}>
                                Baixar Relatório Completo (PDF)
                            </Button>
                        </div>
                    </Card>

                    {/* Breakdown (Estático para Demo) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card title="Contribuição por Etapa">
                            <ul className="space-y-3 mt-2">
                                <li className="flex justify-between items-center text-sm">
                                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Agrícola (Carga Zero)</span>
                                    <span className="font-mono text-slate-600">0.00 %</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Industrial (Processo)</span>
                                    <span className="font-mono text-slate-600">10.2 %</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500"></span> Transporte (Logística)</span>
                                    <span className="font-mono text-slate-600">89.8 %</span>
                                </li>
                            </ul>
                        </Card>

                        <div className="bg-emerald-900 rounded-xl p-6 text-white flex flex-col justify-center items-center text-center">
                            <Leaf size={48} className="mb-4 text-emerald-300" />
                            <h3 className="text-lg font-bold">Projeto Elegível ao RenovaBio</h3>
                            <p className="text-emerald-200 text-sm mt-2">
                                Com base nos dados inseridos, este projeto tem alto potencial para certificação e emissão de CBIOs na B3.
                            </p>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};