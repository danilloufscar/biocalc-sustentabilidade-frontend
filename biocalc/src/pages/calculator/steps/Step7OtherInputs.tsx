import React from 'react';
import { Droplet } from 'lucide-react';
import { Input, Card } from '../../../components/GenericComponents';
import { Step7OtherInputsData } from '../../../Types/Types';

interface Step7OtherInputsProps {
    data: Step7OtherInputsData;
    onUpdate: (data: Partial<Step7OtherInputsData>) => void;
}

export const Step7OtherInputs: React.FC<Step7OtherInputsProps> = ({ data, onUpdate }) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header Visual */}
            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 mb-6">
                <div className="flex">
                    <Droplet className="h-5 w-5 text-cyan-500 mr-3" />
                    <div>
                        <h3 className="text-sm font-medium text-cyan-800">Step 7: Outros Insumos Industriais</h3>
                        <p className="text-sm text-cyan-700 mt-1">
                            Informe o consumo de água e outros insumos utilizados no processo.
                        </p>
                    </div>
                </div>
            </div>

            <Card className="space-y-6">

                {/* 1. Água */}
                <Input
                    label="Consumo de água (m³/ano)"
                    type="number"
                    placeholder="0"
                    value={data.water_consumption?.toString() || ''}
                    onChange={(e) => onUpdate({ water_consumption: parseFloat(e.target.value) || 0 })}
                    helpText="Volume total de água consumida anualmente no processo industrial."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* 2. Lubrificantes */}
                    <Input
                        label="Lubrificantes (kg/ano)"
                        type="number"
                        placeholder="0"
                        value={data.input_lubricant?.toString() || '0'}
                        onChange={(e) => onUpdate({ input_lubricant: parseFloat(e.target.value) || 0 })}
                        helpText="Óleos e graxas."
                    />

                    {/* 3. Químicos */}
                    <Input
                        label="Produtos químicos (kg/ano)"
                        type="number"
                        placeholder="0"
                        value={data.input_chemical?.toString() || '0'}
                        onChange={(e) => onUpdate({ input_chemical: parseFloat(e.target.value) || 0 })}
                        helpText="Reagentes químicos."
                    />

                    {/* 4. Outros */}
                    <Input
                        label="Outros insumos (kg/ano)"
                        type="number"
                        placeholder="0"
                        value={data.input_other?.toString() || '0'}
                        onChange={(e) => onUpdate({ input_other: parseFloat(e.target.value) || 0 })}
                        helpText="Outros materiais."
                    />

                </div>

                {/* Info Box */}
                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                    <p className="text-sm text-cyan-800">
                        <strong>Nota:</strong> Estes insumos auxiliares também contribuem para a pegada
                        de carbono do processo. Informe os valores mais precisos possíveis.
                    </p>
                </div>

            </Card>
        </div>
    );
};
