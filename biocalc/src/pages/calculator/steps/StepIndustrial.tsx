import React from 'react';
import { Factory, Zap, Flame, Truck } from 'lucide-react';
import { Input, Card } from '../../../components/GenericComponents'; // Ajuste o caminho conforme necessário
import { IndustrialData } from '@/Types/Types';

interface StepIndustrialProps {
    data: IndustrialData;
    onUpdate: (data: Partial<IndustrialData>) => void;
}

export const StepIndustrial: React.FC<StepIndustrialProps> = ({ data, onUpdate }) => {

    // Helper para converter input string para number
    const handleChange = (field: keyof IndustrialData, value: string) => {
        onUpdate({ [field]: parseFloat(value) || 0 });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <Factory className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-blue-700">
                            Preencha os dados de consumo energético anual da fábrica. 
                            Esses dados são usados para calcular as emissões do processo de transformação (peletização/briquetagem).
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* BLOCO 1: Eletricidade */}
                <Card className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
                        <Zap className="text-yellow-500" size={20} />
                        <h3 className="font-semibold text-slate-800">Consumo de Eletricidade</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Eletricidade da Rede (Grid)"
                            placeholder="Ex: 50000"
                            type="number"
                            value={data.electricityGrid?.toString()}
                            onChange={(e) => handleChange('electricityGrid', e.target.value)}
                            helpText="Total de kWh comprados da concessionária no ano."
                            // icon={Zap}
                        />
                        <Input
                            label="Eletricidade Autogerada (Renovável)"
                            placeholder="Ex: 10000"
                            type="number"
                            value={data.electricitySelf?.toString()}
                            onChange={(e) => handleChange('electricitySelf', e.target.value)}
                            helpText="Total de kWh gerados internamente (ex: solar, biomassa)."
                        />
                    </div>
                </Card>

                {/* BLOCO 2: Energia Térmica (Secagem) */}
                <Card>
                    <div className="flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
                        <Flame className="text-orange-500" size={20} />
                        <h3 className="font-semibold text-slate-800">Secagem (Calor)</h3>
                    </div>
                    <div className="space-y-4">
                        <Input
                            label="Biomassa queimada para secagem"
                            placeholder="Ex: 2500"
                            type="number"
                            value={data.biomassForHeat?.toString()}
                            onChange={(e) => handleChange('biomassForHeat', e.target.value)}
                            helpText="Toneladas de biomassa (base seca) consumidas nas fornalhas."
                        />
                    </div>
                </Card>

                {/* BLOCO 3: Logística de Entrada */}
                <Card>
                    <div className="flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
                        <Truck className="text-slate-500" size={20} />
                        <h3 className="font-semibold text-slate-800">Logística de Insumos</h3>
                    </div>
                    <div className="space-y-4">
                        <Input
                            label="Distância da Biomassa até a Fábrica"
                            placeholder="Ex: 50"
                            type="number"
                            value={data.distanceBiomassToFactory?.toString()}
                            onChange={(e) => handleChange('distanceBiomassToFactory', e.target.value)}
                            helpText="Distância média (km) do transporte da matéria-prima."
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};