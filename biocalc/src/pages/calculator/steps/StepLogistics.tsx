import { Truck, Ship, MapPin, AlertCircle, Globe } from 'lucide-react';
import { Input, Select, Card } from '../../../components/GenericComponents'; // Ajuste o caminho
import { LogisticsData, RoadVehicleType, ShipType } from '@/Types/Types';

// Opções baseadas na aba 'Dados auxiliares'
const VEHICLE_OPTIONS: RoadVehicleType[] = [
    'Caminhão Toco/Semipesado (16-32t)',
    'Carreta/Pesado (>32t)',
    'VUC (Urbano)'
];

const SHIP_OPTIONS: ShipType[] = [
    'Navio Container (Médio)',
    'Navio Graneleiro (Handymax)'
];

interface StepLogisticsProps {
    data: LogisticsData;
    onUpdate: (data: Partial<LogisticsData>) => void;
}

export const StepLogistics: React.FC<StepLogisticsProps> = ({ data, onUpdate }) => {

    // Helper para atualização profunda do objeto domesticModes
    const handleModeChange = (mode: 'road' | 'rail' | 'water', value: string) => {
        const numValue = parseFloat(value) || 0;
        onUpdate({
            domesticModes: {
                ...data.domesticModes,
                [`${mode}Percentage`]: numValue
            }
        });
    };

    // Validação da soma das porcentagens (apenas visual)
    const totalPercentage = (data.domesticModes.roadPercentage || 0) + 
                            (data.domesticModes.railPercentage || 0) + 
                            (data.domesticModes.waterPercentage || 0);
    
    const isSumValid = Math.abs(totalPercentage - 100) < 0.1; // Margem de erro pequena para float

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            
            <div className="bg-slate-50 border-l-4 border-slate-500 p-4 mb-6">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <MapPin className="h-5 w-5 text-slate-500" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-slate-700">
                            A etapa de transporte considera o deslocamento do produto final (Pellets/Briquetes) 
                            da fábrica até o cliente ou porto de exportação.
                        </p>
                    </div>
                </div>
            </div>

            {/* BLOCO 1: Logística Doméstica (Padrão) */}
            <Card title="Distribuição no Mercado Interno">
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Distância Média até o Cliente (km)"
                            type="number"
                            placeholder="Ex: 500"
                            value={data.domesticDistance.toString()}
                            onChange={(e) => onUpdate({ domesticDistance: parseFloat(e.target.value) || 0 })}
                        />
                        <Select
                            label="Veículo Rodoviário Típico"
                            options={VEHICLE_OPTIONS}
                            value={data.roadVehicleType}
                            onChange={(e) => onUpdate({ roadVehicleType: e.target.value as RoadVehicleType })}
                        />
                    </div>

                    {/* Divisão Modal */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                            <Truck size={16} /> Matriz de Transporte (%)
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                            <Input
                                label="Rodoviário %"
                                type="number"
                                value={data.domesticModes.roadPercentage.toString()}
                                onChange={(e) => handleModeChange('road', e.target.value)}
                            />
                            <Input
                                label="Ferroviário %"
                                type="number"
                                value={data.domesticModes.railPercentage.toString()}
                                onChange={(e) => handleModeChange('rail', e.target.value)}
                            />
                            <Input
                                label="Hidroviário %"
                                type="number"
                                value={data.domesticModes.waterPercentage.toString()}
                                onChange={(e) => handleModeChange('water', e.target.value)}
                            />
                        </div>
                        
                        {/* Validação de Soma 100% */}
                        {!isSumValid && (
                            <div className="mt-2 text-xs text-red-600 flex items-center gap-1">
                                <AlertCircle size={12} />
                                A soma das porcentagens deve ser 100%. Atual: {totalPercentage}%
                            </div>
                        )}
                    </div>
                </div>
            </Card>

            {/* BLOCO 2: Toggle de Exportação */}
            <div className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                    <Globe className={`h-6 w-6 ${data.isExported ? 'text-blue-600' : 'text-slate-400'}`} />
                    <div>
                        <h3 className="font-medium text-slate-900">O produto é exportado?</h3>
                        <p className="text-sm text-slate-500">Habilite para adicionar trechos marítimos e porto.</p>
                    </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={data.isExported}
                        onChange={(e) => onUpdate({ isExported: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>

            {/* BLOCO 3: Dados de Exportação (Condicional) */}
            {data.isExported && (
                <Card className="border-blue-200 bg-blue-50/30">
                    <div className="flex items-center gap-2 mb-4 border-b border-blue-100 pb-2">
                        <Ship className="text-blue-500" size={20} />
                        <h3 className="font-semibold text-slate-800">Logística de Exportação</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Distância Fábrica → Porto (km)"
                            type="number"
                            value={data.distanceFactoryToPort?.toString()}
                            onChange={(e) => onUpdate({ distanceFactoryToPort: parseFloat(e.target.value) || 0 })}
                        />
                         <Select
                            label="Veículo até o Porto"
                            options={VEHICLE_OPTIONS}
                            value={data.portRoadVehicleType || VEHICLE_OPTIONS[1]}
                            onChange={(e) => onUpdate({ portRoadVehicleType: e.target.value as RoadVehicleType })}
                        />
                        <Input
                            label="Distância Marítima (km)"
                            type="number"
                            helpText="Consulte sites como searates.com para estimar."
                            value={data.distancePortToClient?.toString()}
                            onChange={(e) => onUpdate({ distancePortToClient: parseFloat(e.target.value) || 0 })}
                        />
                        <Select
                            label="Tipo de Navio"
                            options={SHIP_OPTIONS}
                            value={data.shipType || SHIP_OPTIONS[0]}
                            onChange={(e) => onUpdate({ shipType: e.target.value as ShipType })}
                        />
                    </div>
                </Card>
            )}

        </div>
    );
};