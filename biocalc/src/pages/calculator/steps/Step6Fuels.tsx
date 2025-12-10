import React from 'react';
import { Fuel } from 'lucide-react';
import { Input, Card } from '../../../components/GenericComponents';
import { Step6FuelsData } from '../../../Types/Types';

interface Step6FuelsProps {
    data: Step6FuelsData;
    onUpdate: (data: Partial<Step6FuelsData>) => void;
}

export const Step6Fuels: React.FC<Step6FuelsProps> = ({ data, onUpdate }) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header Visual */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
                <div className="flex">
                    <Fuel className="h-5 w-5 text-orange-500 mr-3" />
                    <div>
                        <h3 className="text-sm font-medium text-orange-800">Step 6: Consumo de Combustíveis</h3>
                        <p className="text-sm text-orange-700 mt-1">
                            Informe o consumo anual de combustíveis utilizados no processo industrial.
                        </p>
                    </div>
                </div>
            </div>

            <Card className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* 1. Diesel */}
                    <Input
                        label="Diesel (L/ano)"
                        type="number"
                        placeholder="0"
                        value={data.fuel_diesel?.toString() || '0'}
                        onChange={(e) => onUpdate({ fuel_diesel: parseFloat(e.target.value) || 0 })}
                        helpText="Consumo de diesel."
                    />

                    {/* 2. Gasolina */}
                    <Input
                        label="Gasolina (L/ano)"
                        type="number"
                        placeholder="0"
                        value={data.fuel_gasoline?.toString() || '0'}
                        onChange={(e) => onUpdate({ fuel_gasoline: parseFloat(e.target.value) || 0 })}
                        helpText="Consumo de gasolina."
                    />

                    {/* 3. Etanol */}
                    <Input
                        label="Etanol (L/ano)"
                        type="number"
                        placeholder="0"
                        value={data.fuel_ethanol?.toString() || '0'}
                        onChange={(e) => onUpdate({ fuel_ethanol: parseFloat(e.target.value) || 0 })}
                        helpText="Consumo de etanol."
                    />

                    {/* 4. Biodiesel */}
                    <Input
                        label="Biodiesel (L/ano)"
                        type="number"
                        placeholder="0"
                        value={data.fuel_biodiesel?.toString() || '0'}
                        onChange={(e) => onUpdate({ fuel_biodiesel: parseFloat(e.target.value) || 0 })}
                        helpText="Consumo de biodiesel."
                    />

                    {/* 5. GNV */}
                    <Input
                        label="GNV - Gás Natural Veicular (m³/ano)"
                        type="number"
                        placeholder="0"
                        value={data.fuel_gnv?.toString() || '0'}
                        onChange={(e) => onUpdate({ fuel_gnv: parseFloat(e.target.value) || 0 })}
                        helpText="Consumo de gás natural."
                    />

                    {/* 6. GLP */}
                    <Input
                        label="GLP - Gás Liquefeito de Petróleo (kg/ano)"
                        type="number"
                        placeholder="0"
                        value={data.fuel_lpg?.toString() || '0'}
                        onChange={(e) => onUpdate({ fuel_lpg: parseFloat(e.target.value) || 0 })}
                        helpText="Consumo de GLP."
                    />

                    {/* 7. Biomassa */}
                    <Input
                        label="Biomassa (kg/ano)"
                        type="number"
                        placeholder="0"
                        value={data.fuel_biomass?.toString() || '0'}
                        onChange={(e) => onUpdate({ fuel_biomass: parseFloat(e.target.value) || 0 })}
                        helpText="Biomassa para caldeiras."
                    />

                    {/* 8. Outros */}
                    <Input
                        label="Outros combustíveis (L/ano)"
                        type="number"
                        placeholder="0"
                        value={data.fuel_other?.toString() || '0'}
                        onChange={(e) => onUpdate({ fuel_other: parseFloat(e.target.value) || 0 })}
                        helpText="Outros combustíveis não listados."
                    />

                </div>

                {/* Info Box */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-orange-800">
                        <strong>Importante:</strong> Inclua apenas combustíveis utilizados no processo
                        industrial, não no transporte (que será informado nos próximos passos).
                    </p>
                </div>

            </Card>
        </div>
    );
};
