import React from 'react';
import { Building2, Info } from 'lucide-react';
import { Input, Card } from '../../../components/GenericComponents';
import { Step0IdentificationData } from '../../../Types/Types';

interface StepIdentificationProps {
    data: Step0IdentificationData;
    onUpdate: (data: Partial<Step0IdentificationData>) => void;
}

export const StepIdentification: React.FC<StepIdentificationProps> = ({ data, onUpdate }) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header Visual */}
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-6">
                <div className="flex">
                    <Building2 className="h-5 w-5 text-emerald-500 mr-3" />
                    <div>
                        <h3 className="text-sm font-medium text-emerald-800">Identificação do Projeto</h3>
                        <p className="text-sm text-emerald-700 mt-1">
                            Preencha os dados básicos de identificação da empresa e do projeto.
                        </p>
                    </div>
                </div>
            </div>

            <Card className="space-y-6">

                {/* 1. Nome do Projeto */}
                <Input
                    label="Nome do Projeto"
                    type="text"
                    placeholder="Ex: Projeto Biomassa 2024"
                    value={data.name || ''}
                    onChange={(e) => onUpdate({ name: e.target.value })}
                    helpText="Identificação do projeto no sistema."
                    required
                />

                {/* 2. Dados da Empresa */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Nome da Empresa"
                        type="text"
                        placeholder="Ex: BioEnergia S.A."
                        value={data.company_name || ''}
                        onChange={(e) => onUpdate({ company_name: e.target.value })}
                        helpText="Razão social da empresa."
                    />

                    <Input
                        label="CNPJ"
                        type="text"
                        placeholder="00.000.000/0000-00"
                        value={data.cnpj || ''}
                        onChange={(e) => onUpdate({ cnpj: e.target.value })}
                        helpText="CNPJ da empresa."
                    />
                </div>

                {/* 3. Localização */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Estado"
                        type="text"
                        placeholder="Ex: SP"
                        value={data.state || ''}
                        onChange={(e) => onUpdate({ state: e.target.value })}
                        helpText="Estado da unidade produtora."
                    />

                    <Input
                        label="Cidade"
                        type="text"
                        placeholder="Ex: São Carlos"
                        value={data.city || ''}
                        onChange={(e) => onUpdate({ city: e.target.value })}
                        helpText="Cidade da unidade produtora."
                    />
                </div>

                {/* 4. Responsável Técnico */}
                <Input
                    label="Responsável Técnico"
                    type="text"
                    placeholder="Ex: João Silva"
                    value={data.tech_responsible || ''}
                    onChange={(e) => onUpdate({ tech_responsible: e.target.value })}
                    helpText="Nome do responsável técnico pelo projeto."
                />

                {/* 5. Contato */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="E-mail"
                        type="email"
                        placeholder="contato@empresa.com.br"
                        value={data.email || ''}
                        onChange={(e) => onUpdate({ email: e.target.value })}
                        helpText="E-mail para contato."
                    />

                    <Input
                        label="Telefone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        value={data.phone || ''}
                        onChange={(e) => onUpdate({ phone: e.target.value })}
                        helpText="Telefone para contato."
                    />
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                    <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                        Estes dados serão utilizados para identificação do projeto e emissão de relatórios.
                        Certifique-se de que as informações estão corretas.
                    </p>
                </div>

            </Card>
        </div>
    );
};