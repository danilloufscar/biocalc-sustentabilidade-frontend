import React from 'react';
import { Ship } from 'lucide-react';
import { Input, Select, Card } from '../../../components/GenericComponents';
import { Step9ExportTransportData, VEHICLE_TYPES } from '../../../Types/Types';

interface Step9ExportTransportProps {
    data: Step9ExportTransportData;
    onUpdate: (data: Partial<Step9ExportTransportData>) => void;
}

export const Step9ExportTransport: React.FC<Step9ExportTransportProps> = ({ data, onUpdate }) => {
    // Calcula automaticamente as porcentagens dos modais
    const handleRoadPercentageChange = (value: number) => {
        const roadPct = Math.min(100, Math.max(0, value));
        const railPct = data.exp_modal_rail_pct || 0;
        const waterPct = 100 - roadPct - railPct;

        onUpdate({
            exp_modal_road_pct: roadPct,
            exp_modal_water_pct: Math.max(0, waterPct)
        });
    };

    const handleRailPercentageChange = (value: number) => {
        const railPct = Math.min(100, Math.max(0, value));
        const roadPct = data.exp_modal_road_pct || 0;
        const waterPct = 100 - roadPct - railPct;

        onUpdate({
            exp_modal_rail_pct: railPct,
            exp_modal_water_pct: Math.max(0, waterPct)
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header Visual */}
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6">
                <div className="flex">
                    <Ship className="h-5 w-5 text-indigo-500 mr-3" />
                    <div>
                        <h3 className="text-sm font-medium text-indigo-800">Step 9: Transporte para Exportação (Opcional)</h3>
                        <p className="text-sm text-indigo-700 mt-1">
                            Informe dados sobre o transporte do biocombustível para exportação, se aplicável.
                        </p>
                    </div>
                </div>
            </div>

            <Card className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* 1. Massa Exportada */}
                    <Input
                        label="Massa exportada (t/ano)"
                        type="number"
                        placeholder="0"
                        value={data.exp_mass?.toString() || '0'}
                        onChange={(e) => onUpdate({ exp_mass: parseFloat(e.target.value) || 0 })}
                        helpText="Volume total exportado (deixe 0 se não houver exportação)."
                    />

                    {/* 2. Distância Fábrica-Porto */}
                    <Input
                        label="Distância fábrica → porto (km)"
                        type="number"
                        placeholder="0"
                        value={data.exp_factory_port_dist?.toString() || '0'}
                        onChange={(e) => onUpdate({ exp_factory_port_dist: parseFloat(e.target.value) || 0 })}
                        helpText="Distância até o porto de embarque."
                    />

                </div>

                {/* 3. Modal de Transporte até o Porto */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-700">
                        Modal de transporte até o porto
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                            label="Rodoviário (%)"
                            type="number"
                            min="0"
                            max="100"
                            placeholder="100"
                            value={data.exp_modal_road_pct?.toString() || '100'}
                            onChange={(e) => handleRoadPercentageChange(parseFloat(e.target.value) || 0)}
                            helpText="% modal rodoviário."
                        />
                        <Input
                            label="Ferroviário (%)"
                            type="number"
                            min="0"
                            max="100"
                            placeholder="0"
                            value={data.exp_modal_rail_pct?.toString() || '0'}
                            onChange={(e) => handleRailPercentageChange(parseFloat(e.target.value) || 0)}
                            helpText="% modal ferroviário."
                        />
                        <Input
                            label="Hidroviário (%)"
                            type="number"
                            disabled
                            value={data.exp_modal_water_pct?.toString() || '0'}
                            onChange={() => { }}
                            helpText="Calculado automaticamente."
                        />
                    </div>
                </div>

                {/* 4. Tipo de Veículo */}
                <Select
                    label="Tipo de veículo (até o porto)"
                    options={['Não se aplica', ...VEHICLE_TYPES]}
                    value={data.exp_vehicle_port || 'Não se aplica'}
                    onChange={(e) => onUpdate({ exp_vehicle_port: e.target.value !== 'Não se aplica' ? e.target.value : undefined })}
                    helpText="Veículo usado no transporte terrestre até o porto."
                />

                {/* 5. Distância Marítima */}
                <Input
                    label="Distância marítima porto → consumidor (km)"
                    type="number"
                    placeholder="0"
                    value={data.exp_port_consumer_dist?.toString() || '0'}
                    onChange={(e) => onUpdate({ exp_port_consumer_dist: parseFloat(e.target.value) || 0 })}
                    helpText="Distância do transporte marítimo internacional."
                />

                {/* Info Box */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <p className="text-sm text-indigo-800">
                        <strong>Nota:</strong> Se não houver exportação, deixe a massa exportada como 0.
                        A soma dos modais terrestres deve ser 100%.
                    </p>
                </div>

            </Card>
        </div>
    );
};
