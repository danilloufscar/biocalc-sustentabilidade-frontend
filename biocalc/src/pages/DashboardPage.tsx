import { Plus, FileText, Leaf, BarChart3 } from 'lucide-react';
import { Button, Card, Badge } from '@/components/GenericComponents';
import { RECENT_PROJECTS } from '@/mock/mockedData';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {

    const navigate = useNavigate();

    return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">Visão Geral</h1>
            <Button icon={Plus} onClick={() => navigate('/calculator')}>Novo Cálculo</Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-emerald-500">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total de Projetos</p>
                        <h3 className="text-3xl font-bold text-slate-900 mt-2">12</h3>
                    </div>
                    <div className="p-2 bg-emerald-50 rounded-lg">
                        <FileText className="text-emerald-600" size={24} />
                    </div>
                </div>
            </Card>
            <Card className="border-l-4 border-l-blue-500">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-slate-500">CBIOs Potenciais</p>
                        <h3 className="text-3xl font-bold text-slate-900 mt-2">45.2K</h3>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <Leaf className="text-blue-600" size={24} />
                    </div>
                </div>
            </Card>
            <Card className="border-l-4 border-l-purple-500">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Média I.C.</p>
                        <h3 className="text-3xl font-bold text-slate-900 mt-2">2.5 g</h3>
                        <span className="text-xs text-slate-400">CO2eq/MJ</span>
                    </div>
                    <div className="p-2 bg-purple-50 rounded-lg">
                        <BarChart3 className="text-purple-600" size={24} />
                    </div>
                </div>
            </Card>
        </div>

        {/* Recent Calculations Table */}
        <Card title="Cálculos Recentes">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Projeto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Biomassa</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Intensidade (IC)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Data</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {RECENT_PROJECTS.map((project) => (
                            <tr key={project.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{project.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{project.biomass}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><Badge status={project.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{project.carbonIntensity > 0 ? project.carbonIntensity.toFixed(4) : '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{project.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-emerald-600 hover:text-emerald-900">Ver Detalhes</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
    )
};