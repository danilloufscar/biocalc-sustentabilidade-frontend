import React from 'react';
import { MapPin } from 'lucide-react';
import { Select, Card } from '../../../components/GenericComponents';
import { Step2MUTData, BRAZILIAN_STATES, WOOD_RESIDUE_STAGES } from '../../../Types/Types';

interface Step2MUTProps {
    data: Step2MUTData;
    onUpdate: (data: Partial<Step2MUTData>) => void;
}

export const Step2MUT: React.FC<Step2MUTProps> = ({ data, onUpdate }) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header Visual */}
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-6">
                <div className="flex">
                    <MapPin className="h-5 w-5 text-emerald-500 mr-3" />
                    <div>
                        <h3 className="text-sm font-medium text-emerald-800">Step 2: Mudança de Uso da Terra (MUT)</h3>
                        <p className="text-sm text-emerald-700 mt-1">
                            Informe o estado de produção da biomassa e a etapa do ciclo de vida (se aplicável).
                        </p>
                    </div>
                </div>
            </div>

            <Card className="space-y-6">

                {/* 1. Estado da Produção */}
                <Select
                    label="Estado da produção da biomassa"
                    options={['Selecione...', ...BRAZILIAN_STATES]}
                    value={data.production_state || 'Selecione...'}
                    onChange={(e) => onUpdate({ production_state: e.target.value !== 'Selecione...' ? e.target.value : undefined })}
                    helpText="Estado onde a biomassa é produzida."
                />

                {/* 2. Etapa do Ciclo de Vida (para resíduos de madeira) */}
                <Select
                    label="Etapa do ciclo de vida (se resíduo de madeira)"
                    options={WOOD_RESIDUE_STAGES}
                    value={data.wood_residue_stage || 'Não se aplica'}
                    onChange={(e) => onUpdate({ wood_residue_stage: e.target.value })}
                    helpText="Selecione a etapa se a biomassa for resíduo de madeira."
                />

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                        <strong>Sobre MUT:</strong> A Mudança de Uso da Terra considera o impacto de carbono
                        relacionado à conversão de terras para produção de biomassa. Os fatores variam por
                        estado e tipo de cultivo.
                    </p>
                </div>

            </Card>
        </div>
    );
};
