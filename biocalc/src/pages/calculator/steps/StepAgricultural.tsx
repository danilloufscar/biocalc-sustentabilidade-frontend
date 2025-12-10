import React from 'react';
import { Tractor } from 'lucide-react';
import { Input, Select, Card } from '../../../components/GenericComponents';
import { AgriculturalData } from '@/Types/Types';

interface StepAgriculturalProps {
    data: AgriculturalData;
    onUpdate: (data: Partial<AgriculturalData>) => void;
}

export const StepAgricultural: React.FC<StepAgriculturalProps> = ({ data, onUpdate }) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
             <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
                <div className="flex">
                    <Tractor className="h-5 w-5 text-orange-500 mr-3" />
                    <div>
                        <h3 className="text-sm font-medium text-orange-800">Transporte Agrícola</h3>
                        <p className="text-sm text-orange-700 mt-1">
                            Logística da coleta da biomassa (campo) até a unidade de processamento.
                        </p>
                    </div>
                </div>
            </div>

            <Card title="Logística de Entrada (Inbound)">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Distância da biomassa até a unidade (km)"
                        type="number"
                        placeholder="Ex: 50"
                        value={data.transportDistance.toString()}
                        onChange={(e) => onUpdate({ transportDistance: parseFloat(e.target.value) || 0 })}
                        helpText="Distância média entre a fonte de coleta e a fábrica."
                    />
                    
                    <Select
                        label="Tipo de veículo utilizado"
                        options={[
                            'Caminhão Toco/Semipesado (16-32t)',
                            'Carreta/Pesado (>32t)',
                            'VUC (Urbano)'
                        ]}
                        value={data.transportVehicle || 'Carreta/Pesado (>32t)'}
                        onChange={(e) => onUpdate({ transportVehicle: e.target.value })}
                    />
                </div>
            </Card>
        </div>
    );
};