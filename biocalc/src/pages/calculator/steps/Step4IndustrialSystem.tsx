import React from 'react';
import { Factory } from 'lucide-react';
import { Input, Select, Card } from '../../../components/GenericComponents';
import { Step4IndustrialSystemData, YesNo } from '../../../Types/Types';

interface Step4IndustrialSystemProps {
    data: Step4IndustrialSystemData;
    onUpdate: (data: Partial<Step4IndustrialSystemData>) => void;
}

export const Step4IndustrialSystem: React.FC<Step4IndustrialSystemProps> = ({ data, onUpdate }) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header Visual */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <div className="flex">
                    <Factory className="h-5 w-5 text-blue-500 mr-3" />
                    <div>
                        <h3 className="text-sm font-medium text-blue-800">Step 4: Dados do Sistema Industrial</h3>
                        <p className="text-sm text-blue-700 mt-1">
                            Informe dados sobre o processamento industrial e co-geração de energia.
                        </p>
                    </div>
                </div>
            </div>

            <Card className="space-y-6">

                {/* 1. Possui Co-geração? */}
                <Select
                    label="Existe co-geração de energia?"
                    options={['Sim', 'Não']}
                    value={data.has_cogeneration || 'Não'}
                    onChange={(e) => onUpdate({
                        has_cogeneration: e.target.value as YesNo,
                        biomass_cogeneration: e.target.value === 'Não' ? 0 : data.biomass_cogeneration
                    })}
                    helpText="A unidade produz energia elétrica a partir da biomassa?"
                />

                {/* 2. Biomassa Processada */}
                <Input
                    label="Quantidade de biomassa processada (kg/ano)"
                    type="number"
                    placeholder="Ex: 12000000"
                    value={data.biomass_processed?.toString() || ''}
                    onChange={(e) => onUpdate({ biomass_processed: parseFloat(e.target.value) || 0 })}
                    helpText="Total de biomassa processada anualmente na unidade industrial."
                />

                {/* 3. Biomassa para Co-geração (Condicional) */}
                {data.has_cogeneration === 'Sim' && (
                    <Input
                        label="Biomassa consumida na co-geração (kg/ano)"
                        type="number"
                        placeholder="Ex: 2000000"
                        value={data.biomass_cogeneration?.toString() || ''}
                        onChange={(e) => onUpdate({ biomass_cogeneration: parseFloat(e.target.value) || 0 })}
                        helpText="Quantidade de biomassa destinada à geração de energia elétrica."
                    />
                )}

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                        <strong>Co-geração:</strong> Sistemas de co-geração aproveitam a biomassa para
                        produzir energia elétrica e térmica simultaneamente, aumentando a eficiência energética.
                    </p>
                </div>

            </Card>
        </div>
    );
};
