import React from 'react';
import { Building, MapPin, User, FileText } from 'lucide-react';
import { Input, Select, Card } from '@/components/GenericComponents';
import { IdentificationData } from '@/Types/Types';

const BRAZIL_STATES = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

interface StepIdentificationProps {
    data: IdentificationData;
    onUpdate: (data: Partial<IdentificationData>) => void;
}

export const StepIdentification: React.FC<StepIdentificationProps> = ({ data, onUpdate }) => {

    const handleChange = (field: keyof IdentificationData, value: string) => {
        onUpdate({ [field]: value });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            
            <div className="bg-slate-50 border-l-4 border-slate-500 p-4 mb-6">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <FileText className="h-5 w-5 text-slate-500" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-slate-800">Dados do Projeto</h3>
                        <p className="text-sm text-slate-600 mt-1">
                            Estas informações serão utilizadas para identificar o projeto no Dashboard e gerar o cabeçalho do relatório final.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* BLOCO 1: Identificação da Empresa */}
                <Card className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
                        <Building className="text-emerald-600" size={20} />
                        <h3 className="font-semibold text-slate-800">Empresa e Projeto</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <Input
                                label="Nome do Projeto (Identificação Interna)"
                                placeholder="Ex: Planta de Pellets - Lote 2024"
                                value={data.projectName}
                                onChange={(e) => handleChange('projectName', e.target.value)}
                                helpText="Como você quer encontrar este cálculo depois no seu Dashboard?"
                            />
                        </div>
                        <Input
                            label="Razão Social / Nome da Empresa"
                            placeholder="Ex: BioEnergia S.A."
                            value={data.companyName}
                            onChange={(e) => handleChange('companyName', e.target.value)}
                        />
                        <Input
                            label="CNPJ"
                            placeholder="00.000.000/0000-00"
                            value={data.cnpj}
                            onChange={(e) => handleChange('cnpj', e.target.value)}
                        />
                    </div>
                </Card>

                {/* BLOCO 2: Localização */}
                <Card>
                    <div className="flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
                        <MapPin className="text-blue-500" size={20} />
                        <h3 className="font-semibold text-slate-800">Localização da Unidade</h3>
                    </div>
                    <div className="space-y-4">
                        <Select
                            label="Estado (UF)"
                            options={BRAZIL_STATES}
                            value={data.state || 'SP'}
                            onChange={(e) => handleChange('state', e.target.value)}
                        />
                        <Input
                            label="Cidade / Município"
                            placeholder="Ex: Sorocaba"
                            value={data.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                        />
                    </div>
                </Card>

                {/* BLOCO 3: Responsável Técnico */}
                <Card>
                    <div className="flex items-center gap-2 mb-4 border-b pb-2 border-slate-100">
                        <User className="text-slate-500" size={20} />
                        <h3 className="font-semibold text-slate-800">Responsável Técnico</h3>
                    </div>
                    <div className="space-y-4">
                        <Input
                            label="Nome do Responsável"
                            placeholder="Ex: Eng. Ricardo Silva"
                            value={data.techResponsible}
                            onChange={(e) => handleChange('techResponsible', e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Telefone"
                                placeholder="(00) 00000-0000"
                                value={data.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                // icon={Phone}
                            />
                            <Input
                                label="E-mail"
                                placeholder="contato@empresa.com"
                                type="email"
                                value={data.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                // icon={Mail}
                            />
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
};