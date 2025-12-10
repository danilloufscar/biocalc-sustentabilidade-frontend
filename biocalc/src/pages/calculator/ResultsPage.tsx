import {
    TrendingDown,
    Leaf,
    Factory,
    Truck,
    Zap,
    Award,
    DollarSign,
    CheckCircle,
    BarChart3
} from 'lucide-react';
import { Button, Card } from '../../components/GenericComponents';

interface CalculationResults {
    carbon_intensity: number;
    agricultural_emissions: number;
    industrial_emissions: number;
    transport_emissions: number;
    use_emissions: number;
    efficiency_note: number;
    emission_reduction: number;
    cbios: number;
    cbios_revenue: number;
    production_volume: number;
}

interface ResultsPageProps {
    results: CalculationResults;
    projectName: string;
    onNewCalculation?: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
    results,
    projectName,
    onNewCalculation
}) => {
    const FOSSIL_COMPARATOR = 86.7; // gCO2eq/MJ (Mix Diesel/Gasolina)

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-in fade-in duration-700">

            {/* HEADER */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900">Cálculo Concluído!</h1>
                <p className="text-lg text-slate-600">{projectName}</p>
            </div>

            {/* MAIN METRICS - DESTAQUE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Intensidade de Carbono */}
                <Card className="border-t-4 border-t-blue-500 bg-gradient-to-br from-blue-50 to-white">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3">
                            <BarChart3 className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-sm font-medium text-slate-600 mb-2">Intensidade de Carbono</p>
                        <div className="flex items-baseline justify-center gap-2">
                            <span className="text-4xl font-bold text-slate-900">
                                {results.carbon_intensity.toFixed(4)}
                            </span>
                            <span className="text-sm text-slate-500">gCO₂eq/MJ</span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-blue-100">
                            <p className="text-xs text-blue-700 font-medium">
                                vs. Fóssil: {FOSSIL_COMPARATOR} gCO₂eq/MJ
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Redução de Emissões */}
                <Card className="border-t-4 border-t-emerald-500 bg-gradient-to-br from-emerald-50 to-white">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-3">
                            <TrendingDown className="w-6 h-6 text-emerald-600" />
                        </div>
                        <p className="text-sm font-medium text-slate-600 mb-2">Redução de Emissões</p>
                        <div className="flex items-baseline justify-center gap-2">
                            <span className="text-4xl font-bold text-emerald-700">
                                {results.emission_reduction.toFixed(1)}%
                            </span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-emerald-100">
                            <p className="text-xs text-emerald-700 font-medium">
                                Comparado ao combustível fóssil
                            </p>
                        </div>
                    </div>
                </Card>

                {/* CBIOs */}
                <Card className="border-t-4 border-t-amber-500 bg-gradient-to-br from-amber-50 to-white">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-3">
                            <Award className="w-6 h-6 text-amber-600" />
                        </div>
                        <p className="text-sm font-medium text-slate-600 mb-2">CBIOs Gerados</p>
                        <div className="flex items-baseline justify-center gap-2">
                            <span className="text-4xl font-bold text-amber-700">
                                {results.cbios.toLocaleString('pt-BR')}
                            </span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-amber-100">
                            <p className="text-xs text-amber-700 font-medium flex items-center justify-center gap-1">
                                <DollarSign size={12} />
                                R$ {results.cbios_revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* BREAKDOWN POR FASE */}
            <Card title="Detalhamento das Emissões por Fase" className="border-t-4 border-t-slate-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Agrícola */}
                    <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                        <Leaf className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <p className="text-sm font-medium text-slate-700 mb-2">Fase Agrícola</p>
                        <p className={`text - 2xl font - bold ${results.agricultural_emissions < 0 ? 'text-green-600' : 'text-slate-900'} `}>
                            {results.agricultural_emissions.toFixed(4)}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">gCO₂eq/MJ</p>
                        {results.agricultural_emissions < 0 && (
                            <p className="text-xs text-green-700 font-medium mt-2">Sequestro de carbono</p>
                        )}
                    </div>

                    {/* Industrial */}
                    <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <Factory className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <p className="text-sm font-medium text-slate-700 mb-2">Fase Industrial</p>
                        <p className="text-2xl font-bold text-slate-900">
                            {results.industrial_emissions.toFixed(4)}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">gCO₂eq/MJ</p>
                    </div>

                    {/* Transporte */}
                    <div className="text-center p-4 rounded-lg bg-orange-50 border border-orange-200">
                        <Truck className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                        <p className="text-sm font-medium text-slate-700 mb-2">Transporte</p>
                        <p className="text-2xl font-bold text-slate-900">
                            {results.transport_emissions.toFixed(4)}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">gCO₂eq/MJ</p>
                    </div>

                    {/* Uso */}
                    <div className="text-center p-4 rounded-lg bg-purple-50 border border-purple-200">
                        <Zap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <p className="text-sm font-medium text-slate-700 mb-2">Uso Final</p>
                        <p className="text-2xl font-bold text-slate-900">
                            {results.use_emissions.toFixed(4)}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">gCO₂eq/MJ</p>
                    </div>
                </div>

                {/* Gráfico de Barras Comparativo */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                    <h4 className="font-semibold text-slate-900 mb-4">Comparativo: Biocombustível vs Fóssil</h4>
                    <div className="space-y-4">
                        {/* Barra Fóssil */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-slate-700">Combustível Fóssil (Referência)</span>
                                <span className="text-slate-500">{FOSSIL_COMPARATOR} gCO₂eq/MJ</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-8">
                                <div className="bg-slate-400 h-8 rounded-full w-full flex items-center justify-end pr-4">
                                    <span className="text-white text-xs font-bold">100%</span>
                                </div>
                            </div>
                        </div>

                        {/* Barra BioCalc */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-bold text-emerald-700">Seu Biocombustível (BioCalc)</span>
                                <span className="font-bold text-emerald-700">{results.carbon_intensity.toFixed(4)} gCO₂eq/MJ</span>
                            </div>
                            <div className="w-full bg-emerald-100 rounded-full h-8 relative">
                                <div
                                    className="bg-emerald-500 h-8 rounded-full flex items-center justify-end pr-4 text-white text-xs font-bold transition-all duration-1000"
                                    style={{ width: `${(results.carbon_intensity / FOSSIL_COMPARATOR) * 100}% ` }}
                                >
                                    {((results.carbon_intensity / FOSSIL_COMPARATOR) * 100).toFixed(1)}%
                                </div>
                                {/* Seta de Redução */}
                                <div className="absolute top-0 right-0 h-full flex items-center pr-4">
                                    <span className="text-xs text-emerald-800 font-semibold ml-2">
                                        -{results.emission_reduction.toFixed(0)}% Emissões
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* INFORMAÇÕES ADICIONAIS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Nota de Eficiência */}
                <Card className="bg-gradient-to-br from-slate-50 to-white">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                                <Award className="w-6 h-6 text-slate-600" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1">Nota de Eficiência Energético-Ambiental</h3>
                            <p className="text-3xl font-bold text-slate-900 mb-2">
                                {results.efficiency_note.toFixed(4)}
                            </p>
                            <p className="text-sm text-slate-600">
                                Métrica utilizada pelo RenovaBio para classificação de biocombustíveis.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Volume de Produção */}
                <Card className="bg-gradient-to-br from-slate-50 to-white">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                                <BarChart3 className="w-6 h-6 text-slate-600" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1">Volume de Produção Anual</h3>
                            <p className="text-3xl font-bold text-slate-900 mb-2">
                                {results.production_volume.toLocaleString('pt-BR')} t/ano
                            </p>
                            <p className="text-sm text-slate-600">
                                Volume total elegível para certificação RenovaBio.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* CERTIFICAÇÃO RENOVABIO */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-8 text-white text-center">
                <Leaf className="w-16 h-16 mx-auto mb-4 opacity-90" />
                <h2 className="text-2xl font-bold mb-2">Projeto Elegível ao RenovaBio</h2>
                <p className="text-emerald-100 max-w-2xl mx-auto mb-6">
                    Com base nos dados calculados, este projeto apresenta alto potencial para certificação
                    e emissão de Créditos de Descarbonização (CBIOs) na B3.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button
                        variant="outline"
                        className="bg-white text-emerald-700 hover:bg-emerald-50 border-white px-8 py-3 text-base"
                        onClick={onNewCalculation}
                    >
                        Novo Cálculo
                    </Button>
                </div>
            </div>
        </div>
    );
};
