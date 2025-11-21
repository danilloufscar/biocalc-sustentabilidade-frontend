import React, { useState } from 'react';
import { Leaf, LayoutDashboard, Calculator, FileText, Settings, LogOut, Menu, ChevronRight, User } from 'lucide-react';
import { Page, UserType } from '@/Types/Types';


interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
  collapsed: boolean;
}

const SidebarItem = ({ icon: Icon, label, active, onClick, collapsed }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
      active 
        ? 'bg-emerald-600/10 text-emerald-600 border-r-4 border-emerald-600' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <Icon size={20} />
    {!collapsed && <span className="font-medium text-sm">{label}</span>}
  </button>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  navigate: (page: Page) => void;
  user: UserType;
}

export const DashboardLayout = ({ children, currentPage, navigate }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-slate-200 fixed inset-y-0 left-0 z-20 transition-all duration-300 ease-in-out flex flex-col
          ${sidebarOpen ? 'w-64' : 'w-20'}
        `}
      >
        <div className="h-16 flex items-center justify-center border-b border-slate-100 px-4">
            {sidebarOpen ? (
                 <div className="flex items-center gap-2">
                    <div className="bg-emerald-600 p-1.5 rounded-lg">
                        <Leaf className="text-white h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold text-slate-900">BioCalc</span>
                    <span className="ml-auto text-sm font-medium text-slate-500">v1.0</span>
                </div>
            ) : (
                <div className="bg-emerald-600 p-1.5 rounded-lg">
                    <Leaf className="text-white h-5 w-5" />
                </div>
            )}
        </div>

        <div className="flex-1 py-6 space-y-1">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={currentPage === 'dashboard'} 
            onClick={() => navigate('dashboard')}
            collapsed={!sidebarOpen}
          />
          <SidebarItem 
            icon={Calculator} 
            label="Nova Calculadora" 
            active={currentPage === 'calculator'} 
            onClick={() => navigate('calculator')}
            collapsed={!sidebarOpen}
          />
          <SidebarItem 
            icon={FileText} 
            label="Meus Projetos" 
            active={currentPage === 'projects'} 
            onClick={() => navigate('projects')}
            collapsed={!sidebarOpen}
          />
          <SidebarItem 
            icon={Settings} 
            label="Configurações" 
            active={false} 
            onClick={() => {}}
            collapsed={!sidebarOpen}
          />
        </div>

        <div className="p-4 border-t border-slate-100">
             <button onClick={() => navigate('login')} className={`flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors ${!sidebarOpen && 'justify-center'}`}>
                <LogOut size={18} />
                {sidebarOpen && <span className="text-sm font-medium">Sair</span>}
             </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
             <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-slate-500 hover:bg-slate-100 p-1.5 rounded-md"
             >
                <Menu size={20} />
             </button>
             <nav className="hidden md:flex text-sm text-slate-500">
                <span>Home</span>
                <ChevronRight size={16} className="mx-2" />
                <span className="font-medium text-slate-900 capitalize">
                    {currentPage === 'calculator' ? 'Cálculo de Eficiência' : currentPage}
                </span>
             </nav>
          </div>

          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
                <div className="text-sm font-medium text-slate-900">Eng. Ricardo</div>
                <div className="text-xs text-slate-500">BioEnergia S.A.</div>
             </div>
             <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 border border-emerald-200">
                <User size={18} />
             </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
            {children}
        </main>
      </div>
    </div>
  );
};