import React from 'react';
import { Package } from 'lucide-react';
import { Input, Card } from '../../../components/GenericComponents';
import { Step10ProductionVolumeData } from '../../../Types/Types';

interface Step10ProductionVolumeProps {
    data: Step10ProductionVolumeData;
    onUpdate: (data: Partial<Step10ProductionVolumeData>) => void;
}

export const Step10ProductionVolume: React.FC<Step10ProductionVolumeProps> = ({ data, onUpdate }) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header Visual */}
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <div className="flex">
                    <Package className="h-5 w-5 text-green-500 mr-3" />
                    <div>
                        <h3 className="text-sm font-medium text-green-800">Step 10: Volume de Produção</h3>
                        <p className="text-sm text-green-700 mt-1">
                            Informe o volume total de produção elegível para cálculo de CBIOs.
                        </p>
                    </div>
                </div>
            </div>

            <Card className="space-y-6">

                {/* 1. Volume de Produção */}
                <Input
                    label="Volume de produção elegível (toneladas/ano)"
                    type="number"
                    placeholder="Ex: 12000"
                    value={data.production_volume?.toString() || ''}
                    onChange={(e) => onUpdate({ production_volume: parseFloat(e.target.value) || 0 })}
                    helpText="Volume anual de biocombustível sólido produzido e elegível para o RenovaBio."
                    required
                />

                {/* Info Box */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800">
                        <strong>Importante:</strong> Este é o último passo antes do cálculo final.
                        Certifique-se de que todos os dados anteriores estão corretos antes de prosseguir.
                    </p>
                </div>

                {/* Summary Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-900 mb-3">Próximos passos</h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex items-start">
                            <span className="text-emerald-600 mr-2">✓</span>
                            <span>Revise todos os dados informados nos passos anteriores</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-emerald-600 mr-2">✓</span>
                            <span>Clique em "Calcular Resultados" para processar os dados</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-emerald-600 mr-2">✓</span>
                            <span>Você receberá a Intensidade de Carbono, Nota de Eficiência, CBIOs e mais</span>
                        </li>
                    </ul>
                </div>

            </Card>
        </div>
    );
};
