import React from 'react';
import { Sprout, Droplets, Tractor, AlertTriangle, Scale } from 'lucide-react';
import { Input, Card }  from '@/components/GenericComponents';
import { AgriculturalData } from '@/Types/Types';

interface StepAgriculturalProps {
    data: AgriculturalData;
    onUpdate: (data: Partial<AgriculturalData>) => void;
}

export const StepAgricultural: React.FC<StepAgriculturalProps> = ({ data, onUpdate }) => {

    const handleChange = (field: keyof AgriculturalData, value: string) => {
        onUpdate({ [field]: parseFloat(value) || 0 });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            
            {/* Aviso de Contexto */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-orange-800">Fase Agrícola Ativa</h3>
                        <p className="text-sm text-orange-700 mt-1">
                            Está a preencher estes dados porque a biomassa selecionada <strong>não foi marcada como Resíduo</strong>. 
                            As emissões do cultivo (fertilizantes e diesel) serão contabilizadas.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* BLOCO 1: Fertilizantes (NPK) */}
                <Card className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
                        <Sprout className="text-emerald-600" size={20} />
                        <h3 className="font-semibold text-slate-800">Aplicação de Fertilizantes (Média Anual)</h3>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">
                        Insira a quantidade do nutriente ativo por hectare, e não o peso total do adubo.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                            label="Nitrogénio (N)"
                            placeholder="Ex: 100"
                            type="number"
                            value={data.fertilizerN.toString()}
                            onChange={(e) => handleChange('fertilizerN', e.target.value)}
                            helpText="kg N / ha (Principal fonte de N2O)"
                        />
                        <Input
                            label="Fósforo (P₂O₅)"
                            placeholder="Ex: 50"
                            type="number"
                            value={data.fertilizerP.toString()}
                            onChange={(e) => handleChange('fertilizerP', e.target.value)}
                            helpText="kg P₂O₅ / ha"
                        />
                        <Input
                            label="Potássio (K₂O)"
                            placeholder="Ex: 120"
                            type="number"
                            value={data.fertilizerK.toString()}
                            onChange={(e) => handleChange('fertilizerK', e.target.value)}
                            helpText="kg K₂O / ha"
                        />
                    </div>
                </Card>

                {/* BLOCO 2: Corretivos e Solo */}
                <Card>
                    <div className="flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
                        <Scale className="text-slate-500" size={20} />
                        <h3 className="font-semibold text-slate-800">Correção do Solo</h3>
                    </div>
                    <div className="space-y-4">
                        <Input
                            label="Calcário / Dolomita"
                            placeholder="Ex: 2000"
                            type="number"
                            value={data.limestone.toString()}
                            onChange={(e) => handleChange('limestone', e.target.value)}
                            helpText="kg/ha aplicado (Emite CO₂ na reação com o solo)"
                        />
                    </div>
                </Card>

                {/* BLOCO 3: Operações Mecanizadas */}
                <Card>
                    <div className="flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
                        <Tractor className="text-blue-500" size={20} />
                        <h3 className="font-semibold text-slate-800">Operações de Campo</h3>
                    </div>
                    <div className="space-y-4">
                        <Input
                            label="Consumo de Diesel Agrícola"
                            placeholder="Ex: 150"
                            type="number"
                            value={data.dieselPerHectare.toString()}
                            onChange={(e) => handleChange('dieselPerHectare', e.target.value)}
                            helpText="Litros/ha (Preparação, Plantio, Colheita, Transporte interno)"
                        />
                    </div>
                </Card>

                {/* BLOCO 4: Produtividade (Fundamental para o denominador) */}
                <Card className="md:col-span-2 bg-emerald-50/50 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-4">
                        <Droplets className="text-emerald-600" size={20} />
                        <h3 className="font-semibold text-emerald-900">Produtividade da Cultura</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div className="text-sm text-slate-600">
                            A produtividade é essencial para diluir as emissões por hectare. 
                            Quanto maior a produtividade, menor a Intensidade de Carbono.
                        </div>
                        <Input
                            label="Rendimento Agrícola (Base Húmida)"
                            placeholder="Ex: 35"
                            type="number"
                            value={data.yieldPerHectare.toString()}
                            onChange={(e) => handleChange('yieldPerHectare', e.target.value)}
                            helpText="Toneladas de biomassa colhida por hectare (t/ha)"
                        />
                    </div>
                </Card>

            </div>
        </div>
    );
};