import React from 'react';
import { Leaf } from 'lucide-react';
import { Input, Select, Card } from '../../../components/GenericComponents';
import { Step1BiomassProductionData, BiomassType, YesNo } from '../../../Types/Types';

const BIOMASS_OPTIONS: BiomassType[] = [
    'Resíduo de Pinus',
    'Resíduo de Eucaliptus',
    'Carvão vegetal de eucalipto',
    'Casca de Amendoin',
    'Eucaliptus Virgem',
    'Pinus Virgem'
];

interface Step1BiomassProductionProps {
    data: Step1BiomassProductionData;
    onUpdate: (data: Partial<Step1BiomassProductionData>) => void;
}

export const Step1BiomassProduction: React.FC<Step1BiomassProductionProps> = ({ data, onUpdate }) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header Visual */}
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-6">
                <div className="flex">
                    <Leaf className="h-5 w-5 text-emerald-500 mr-3" />
                    <div>
                        <h3 className="text-sm font-medium text-emerald-800">Step 1: Produção de Biomassa</h3>
                        <p className="text-sm text-emerald-700 mt-1">
                            Defina a matéria-prima e os insumos básicos de entrada.
                        </p>
                    </div>
                </div>
            </div>

            <Card className="space-y-6">

                {/* 1. Tipo de Biomassa */}
                <Select
                    label="Tipo de Biomassa"
                    options={BIOMASS_OPTIONS}
                    value={data.biomass_type}
                    onChange={(e) => onUpdate({ biomass_type: e.target.value as BiomassType })}
                    helpText="Selecione a fonte principal de biomassa."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* 2. Possui informação sobre consumo? */}
                    <Select
                        label="Possui informação sobre o consumo de Biomassa?"
                        options={['Sim', 'Não']}
                        value={data.biomass_consumption_known || 'Não'}
                        onChange={(e) => onUpdate({
                            biomass_consumption_known: e.target.value as YesNo,
                            biomass_consumption_value: e.target.value === 'Não' ? undefined : data.biomass_consumption_value
                        })}
                        helpText="kg de biomassa por kg de biocombustível (Base Úmida)."
                    />

                    {/* 3. Entrada de Biomassa (Condicional) */}
                    {data.biomass_consumption_known === 'Sim' ? (
                        <Input
                            label="Entrada de biomassa - dado específico"
                            type="number"
                            placeholder="Ex: 1.10"
                            value={data.biomass_consumption_value?.toString() || ''}
                            onChange={(e) => onUpdate({ biomass_consumption_value: parseFloat(e.target.value) || 0 })}
                            helpText="Informe o valor específico (kg/kg)."
                        />
                    ) : (
                        <div className="bg-slate-50 border border-slate-200 rounded px-4 py-2 flex items-center justify-center text-sm text-slate-500 italic h-[76px] mt-7">
                            Será considerado o dado padrão do banco de dados.
                        </div>
                    )}
                </div>

                {/* 4. Amido de Milho */}
                <Input
                    label="Entrada de amido de milho (kg/MJ)"
                    type="number"
                    placeholder="0.00"
                    value={data.starch_input?.toString() || '0'}
                    onChange={(e) => onUpdate({ starch_input: parseFloat(e.target.value) || 0 })}
                    helpText="Quantidade de amido utilizada como aglutinante (se houver)."
                />

            </Card>
        </div>
    );
};
