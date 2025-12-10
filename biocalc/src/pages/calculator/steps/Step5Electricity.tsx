import React from 'react';
import { Zap } from 'lucide-react';
import { Input, Card } from '../../../components/GenericComponents';
import { Step5ElectricityData } from '../../../Types/Types';

interface Step5ElectricityProps {
    data: Step5ElectricityData;
    onUpdate: (data: Partial<Step5ElectricityData>) => void;
}

export const Step5Electricity: React.FC<Step5ElectricityProps> = ({ data, onUpdate }) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header Visual */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                <div className="flex">
                    <Zap className="h-5 w-5 text-yellow-500 mr-3" />
                    <div>
                        <h3 className="text-sm font-medium text-yellow-800">Step 5: Consumo de Eletricidade</h3>
                        <p className="text-sm text-yellow-700 mt-1">
                            Informe o consumo anual de eletricidade por fonte de energia.
                        </p>
                    </div>
                </div>
            </div>

            <Card className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* 1. Rede Elétrica */}
                    <Input
                        label="Rede elétrica (kWh/ano)"
                        type="number"
                        placeholder="0"
                        value={data.elec_grid?.toString() || '0'}
                        onChange={(e) => onUpdate({ elec_grid: parseFloat(e.target.value) || 0 })}
                        helpText="Energia da rede pública."
                    />

                    {/* 2. Solar */}
                    <Input
                        label="Energia solar (kWh/ano)"
                        type="number"
                        placeholder="0"
                        value={data.elec_solar?.toString() || '0'}
                        onChange={(e) => onUpdate({ elec_solar: parseFloat(e.target.value) || 0 })}
                        helpText="Geração fotovoltaica."
                    />

                    {/* 3. Eólica */}
                    <Input
                        label="Energia eólica (kWh/ano)"
                        type="number"
                        placeholder="0"
                        value={data.elec_wind?.toString() || '0'}
                        onChange={(e) => onUpdate({ elec_wind: parseFloat(e.target.value) || 0 })}
                        helpText="Geração eólica."
                    />

                    {/* 4. Hidrelétrica */}
                    <Input
                        label="Energia hidrelétrica (kWh/ano)"
                        type="number"
                        placeholder="0"
                        value={data.elec_hydro?.toString() || '0'}
                        onChange={(e) => onUpdate({ elec_hydro: parseFloat(e.target.value) || 0 })}
                        helpText="Geração hidrelétrica própria."
                    />

                    {/* 5. Biomassa */}
                    <Input
                        label="Energia de biomassa (kWh/ano)"
                        type="number"
                        placeholder="0"
                        value={data.elec_biomass?.toString() || '0'}
                        onChange={(e) => onUpdate({ elec_biomass: parseFloat(e.target.value) || 0 })}
                        helpText="Co-geração a partir de biomassa."
                    />

                    {/* 6. Outras */}
                    <Input
                        label="Outras fontes (kWh/ano)"
                        type="number"
                        placeholder="0"
                        value={data.elec_other?.toString() || '0'}
                        onChange={(e) => onUpdate({ elec_other: parseFloat(e.target.value) || 0 })}
                        helpText="Outras fontes de energia."
                    />

                </div>

                {/* Info Box */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                        <strong>Dica:</strong> Fontes renováveis (solar, eólica, biomassa) têm menor impacto
                        de carbono comparadas à rede elétrica convencional.
                    </p>
                </div>

            </Card>
        </div>
    );
};
