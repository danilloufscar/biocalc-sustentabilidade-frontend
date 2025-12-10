import React from 'react';
import { Truck } from 'lucide-react';
import { Input, Select, Card } from '../../../components/GenericComponents';
import { Step3BiomassTransportData, VEHICLE_TYPES } from '../../../Types/Types';

interface Step3BiomassTransportProps {
    data: Step3BiomassTransportData;
    onUpdate: (data: Partial<Step3BiomassTransportData>) => void;
}

export const Step3BiomassTransport: React.FC<Step3BiomassTransportProps> = ({ data, onUpdate }) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header Visual */}
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-6">
                <div className="flex">
                    <Truck className="h-5 w-5 text-emerald-500 mr-3" />
                    <div>
                        <h3 className="text-sm font-medium text-emerald-800">Step 3: Transporte da Biomassa</h3>
                        <p className="text-sm text-emerald-700 mt-1">
                            Informe a distância e o tipo de veículo usado para transportar a biomassa até a fábrica.
                        </p>
                    </div>
                </div>
            </div>

            <Card className="space-y-6">

                {/* 1. Distância de Transporte */}
                <Input
                    label="Distância de transporte (km)"
                    type="number"
                    placeholder="Ex: 50"
                    value={data.agr_transport_distance?.toString() || ''}
                    onChange={(e) => onUpdate({ agr_transport_distance: parseFloat(e.target.value) || 0 })}
                    helpText="Distância média da origem da biomassa até a unidade industrial."
                />

                {/* 2. Tipo de Veículo */}
                <Select
                    label="Tipo de veículo"
                    options={VEHICLE_TYPES}
                    value={data.agr_transport_vehicle || VEHICLE_TYPES[0]}
                    onChange={(e) => onUpdate({ agr_transport_vehicle: e.target.value })}
                    helpText="Selecione o tipo de veículo utilizado no transporte."
                />

                {/* Info Box */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-800">
                        <strong>Dica:</strong> Considere a distância média ponderada se houver múltiplos
                        fornecedores de biomassa.
                    </p>
                </div>

            </Card>
        </div>
    );
};
