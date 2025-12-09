import { Leaf, Info } from 'lucide-react';
import { Input, Select, Card, }  from '@/components/GenericComponents';
import { BiomassData, BiomassType } from '@/Types/Types';

// Dados da aba 'Dados auxiliares' da planilha original
const BIOMASS_DEFAULTS: Record<string, { pci: number; defaultIsResidue: boolean }> = {
    'Resíduo de Pinus': { pci: 18.8, defaultIsResidue: true },
    'Resíduo de Eucaliptus': { pci: 15.8, defaultIsResidue: true },
    'Casca de Amendoim': { pci: 16.5, defaultIsResidue: true },
    'Bagaço de Cana': { pci: 17.2, defaultIsResidue: true },
    'Cavaco de Madeira': { pci: 18.5, defaultIsResidue: false }, // Geralmente requer fase agrícola
    'Outros (Inserir PCI Manualmente)': { pci: 0, defaultIsResidue: false }
};

const BIOMASS_OPTIONS = Object.keys(BIOMASS_DEFAULTS);

interface StepBiomassProps {
    data: BiomassData;
    onUpdate: (data: Partial<BiomassData>) => void;
}

export const StepBiomass: React.FC<StepBiomassProps> = ({ data, onUpdate }) => {

    // Efeito: Atualiza PCI e flag de Resíduo ao mudar o Tipo (se o usuário ainda não mexeu)
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value as BiomassType;
        const defaults = BIOMASS_DEFAULTS[newType];
        
        if (defaults) {
            onUpdate({ 
                type: newType,
                pci: defaults.pci,
                isResidue: defaults.defaultIsResidue
            });
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Cabeçalho Explicativo */}
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-6">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <Leaf className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-emerald-800">Definição da Matéria-Prima</h3>
                        <p className="text-sm text-emerald-700 mt-1">
                            A classificação da biomassa define o fluxo de cálculo. 
                            <strong> Resíduos</strong> são isentos de emissões na fase agrícola (Conceito de Carga Zero).
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* BLOCO 1: Seleção Principal */}
                <Card className="md:col-span-2 space-y-4">
                    <Select
                        label="Tipo de Biomassa"
                        options={BIOMASS_OPTIONS}
                        value={data.type}
                        onChange={handleTypeChange}
                    />

                    {/* Toggle de Resíduo (Lógica Crítica) */}
                    <div className={`p-4 rounded-lg border transition-colors duration-300 ${data.isResidue ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
                        <div className="flex items-start gap-3">
                            <div className="pt-1">
                                <input
                                    type="checkbox"
                                    id="isResidueCheck"
                                    className="h-5 w-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                                    checked={data.isResidue}
                                    onChange={(e) => onUpdate({ isResidue: e.target.checked })}
                                />
                            </div>
                            <div>
                                <label htmlFor="isResidueCheck" className="font-semibold text-slate-900 cursor-pointer">
                                    Classificar como Resíduo / Subproduto
                                </label>
                                <p className="text-sm text-slate-600 mt-1">
                                    {data.isResidue 
                                        ? "✅ Opção selecionada: O cálculo assumirá 'Carga Zero' (Zero Burden). As etapas de plantio, colheita e fertilizantes serão puladas." 
                                        : "⚠️ Opção desmarcada: Será necessário preencher os dados da fase agrícola (Fertilizantes, Diesel, Produtividade)."}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* BLOCO 2: Propriedades Físico-Químicas */}
                <Card title="Propriedades Físicas">
                    <div className="space-y-4">
                        <Input
                            label="Umidade na Entrada (%)"
                            type="number"
                            placeholder="Ex: 40"
                            value={data.moistureContent.toString()}
                            onChange={(e) => onUpdate({ moistureContent: parseFloat(e.target.value) || 0 })}
                            helpText="Teor de umidade da biomassa antes da secagem (base úmida)."
                        />
                        
                        <div className="relative">
                            <Input
                                label="Poder Calorífico Inferior (PCI) - MJ/kg"
                                type="number"
                                placeholder="Ex: 18.8"
                                value={data.pci?.toString()}
                                onChange={(e) => onUpdate({ pci: parseFloat(e.target.value) || 0 })}
                                helpText="Energia contida na biomassa. Se não souber, mantenha o padrão sugerido."
                            />
                            {data.type !== 'Outros (Inserir PCI Manualmente)' && (
                                <div className="absolute top-0 right-0">
                                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">
                                        Padrão: {BIOMASS_DEFAULTS[data.type]?.pci}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
                
                {/* BLOCO 3: Resumo do Fluxo */}
                <Card className="bg-slate-50 border border-slate-200 flex flex-col justify-center">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                        <Info size={16} /> Próximos Passos
                    </h4>
                    <ul className="text-sm text-slate-600 space-y-2">
                        <li className={data.isResidue ? "line-through opacity-50" : "font-medium text-orange-600"}>
                            1. Fase Agrícola (Plantio & Insumos)
                        </li>
                        <li className="font-medium text-emerald-600">
                            2. Fase Industrial (Energia & Secagem)
                        </li>
                        <li className="font-medium text-emerald-600">
                            3. Logística (Transporte)
                        </li>
                    </ul>
                </Card>

            </div>
        </div>
    );
};