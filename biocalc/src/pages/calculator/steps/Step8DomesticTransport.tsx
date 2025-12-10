import React from 'react';
import { Truck } from 'lucide-react';
import { Input, Select, Card } from '../../../components/GenericComponents';
import { Step8DomesticTransportData, VEHICLE_TYPES } from '../../../Types/Types';

interface Step8DomesticTransportProps {
    data: Step8DomesticTransportData;
    onUpdate: (data: Partial<Step8DomesticTransportData>) => void;
}

export const Step8DomesticTransport: React.FC<Step8DomesticTransportProps> = ({ data, onUpdate }) => {
    // Calcula automaticamente a porcentagem ferroviária
    const handleRoadPercentageChange = (value: number) => {
        const roadPct = Math.min(100, Math.max(0, value));
        const railPct = 100 - roadPct;
        onUpdate({
            dom_modal_road_pct: roadPct,
            dom_modal_rail_pct: railPct
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header Visual */}
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
                <div className="flex">
                    <Truck className="h-5 w-5 text-purple-500 mr-3" />
                    <div>
                        <h3 className="text-sm font-medium text-purple-800">Step 8: Transporte Doméstico</h3>
                        <p className="text-sm text-purple-700 mt-1">
                            Informe dados sobre o transporte do biocombustível até o consumidor final no mercado doméstico.
                        </p>
                    </div>
                </div>
            </div>

            <Card className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* 1. Massa Transportada */}
                    <Input
                        label="Massa transportada (kg/ano)"
                        type="number"
                        placeholder="Ex: 12000000"
                        value={data.dom_mass?.toString() || ''}
                        onChange={(e) => onUpdate({ dom_mass: parseFloat(e.target.value) || 0 })}
                        helpText="Volume total transportado domesticamente."
                    />

                    {/* 2. Distância Média */}
                    <Input
                        label="Distância média (km)"
                        type="number"
                        placeholder="Ex: 50"
                        value={data.dom_distance?.toString() || ''}
                        onChange={(e) => onUpdate({ dom_distance: parseFloat(e.target.value) || 0 })}
                        helpText="Distância média até o consumidor."
                    />

                </div>

                {/* 3. Modal de Transporte */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-700">
                        Modal de transporte
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Input
                                label="Rodoviário (%)"
                                type="number"
                                min="0"
                                max="100"
                                placeholder="100"
                                value={data.dom_modal_road_pct?.toString() || '100'}
                                onChange={(e) => handleRoadPercentageChange(parseFloat(e.target.value) || 0)}
                                helpText="Percentual do modal rodoviário."
                            />
                        </div>
                        <div>
                            <Input
                                label="Ferroviário (%)"
                                type="number"
                                disabled
                                value={data.dom_modal_rail_pct?.toString() || '0'}
                                onChange={() => { }}
                                helpText="Calculado automaticamente."
                            />
                        </div>
                    </div>
                </div>

                {/* 4. Tipo de Veículo */}
                <Select
                    label="Tipo de veículo (rodoviário)"
                    options={VEHICLE_TYPES}
                    value={data.dom_vehicle_type || VEHICLE_TYPES[0]}
                    onChange={(e) => onUpdate({ dom_vehicle_type: e.target.value })}
                    helpText="Selecione o tipo de veículo predominante."
                />

                {/* Info Box */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-sm text-purple-800">
                        <strong>Dica:</strong> A soma dos modais deve ser 100%. O sistema calcula
                        automaticamente o modal ferroviário baseado no rodoviário.
                    </p>
                </div>

            </Card>
        </div>
    );
};
