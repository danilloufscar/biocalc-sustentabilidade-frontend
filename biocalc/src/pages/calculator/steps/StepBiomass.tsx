import React from 'react';
import { Leaf, Info } from 'lucide-react';
import { Input, Select, Card } from '../../../components/GenericComponents';
import { BiomassData, BiomassType } from '../../../Types';

// Opções extraídas da aba 'Dados auxiliares'
const BIOMASS_OPTIONS: BiomassType[] = [
    'Resíduo de Pinus',
    'Resíduo de Eucaliptus',
    'Casca de Amendoim',
    'Bagaço de Cana',
    'Cavaco de Madeira',
    'Outros'
];

interface StepBiomassProps {
    data: BiomassData;
    onUpdate: (data: Partial<BiomassData>) => void;
}

export const StepBiomass: React.FC<StepBiomassProps> = ({ data, onUpdate }) => {

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            
            {/* Header Visual */}
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-6">
                <div className="flex">
                    <Leaf className="h-5 w-5 text-emerald-500 mr-3" />
                    <div>
                        <h3 className="text-sm font-medium text-emerald-800">Produção de Biomassa</h3>
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
                    value={data.type}
                    onChange={(e) => onUpdate({ type: e.target.value as BiomassType })}
                    helpText="Selecione a fonte principal de biomassa conforme Linha 33 da planilha."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* 2. Possui informação sobre consumo? */}
                    <Select
                        label="Possui informação sobre o consumo de Biomassa?"
                        options={['Sim', 'Não']}
                        value={data.biomassConsumptionKnown}
                        onChange={(e) => onUpdate({ 
                            biomassConsumptionKnown: e.target.value as 'Sim' | 'Não',
                            // Limpa o valor se mudar para Não
                            biomassConsumptionValue: e.target.value === 'Não' ? 0 : data.biomassConsumptionValue
                        })}
                        helpText="kg de biomassa por kg de biocombustível (Base Úmida)."
                    />

                    {/* 3. Entrada de Biomassa (Condicional) */}
                    {data.biomassConsumptionKnown === 'Sim' ? (
                        <Input
                            label="Entrada de biomassa - dado específico"
                            type="number"
                            placeholder="Ex: 1.10"
                            value={data.biomassConsumptionValue?.toString()}
                            onChange={(e) => onUpdate({ biomassConsumptionValue: parseFloat(e.target.value) || 0 })}
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
                    label="Entrada de amido de milho (kg)"
                    type="number"
                    placeholder="0.00"
                    value={data.starchInput?.toString()}
                    onChange={(e) => onUpdate({ starchInput: parseFloat(e.target.value) || 0 })}
                    helpText="Quantidade de amido utilizada como aglutinante (se houver)."
                />

            </Card>
        </div>
    );
};