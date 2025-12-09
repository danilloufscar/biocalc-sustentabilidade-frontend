// Types.ts

// --- ENUMS & CONSTANTS (Baseado na aba 'Dados auxiliares') ---

export type BiomassType = 
    | 'Resíduo de Pinus'
    | 'Resíduo de Eucaliptus'
    | 'Casca de Amendoim'
    | 'Bagaço de Cana'
    | 'Cavaco de Madeira'
    | 'Outros (Inserir PCI Manualmente)';

export type TransportMode = 'Rodoviário' | 'Ferroviário' | 'Hidroviário';

export type RoadVehicleType = 
    | 'Caminhão Toco/Semipesado (16-32t)'
    | 'Carreta/Pesado (>32t)'
    | 'VUC (Urbano)';

export type ShipType = 
    | 'Navio Container (Médio)'
    | 'Navio Graneleiro (Handymax)';

// --- INTERFACES DE STEPS (Payloads para API) ---

// Step 0: Identificação
export interface IdentificationData {
    projectName: string;
    companyName: string;
    cnpj: string;
    state: string;
    city: string;
    techResponsible: string;
    email: string;
    phone: string;
}

// Step 1: Definição da Biomassa
export interface BiomassData {
    type: BiomassType;
    isResidue: boolean; // Se true, aplica regra "Zero Burden" (pula steps 2 e 3)
    moistureContent: number; // % de umidade
    pci?: number; // Poder Calorífico Inferior (opcional se for padrão)
}

// Steps 2 & 3: Fase Agrícola (Apenas se !isResidue)
export interface AgriculturalData {
    fertilizerN: number; // kg N/ha
    fertilizerP: number; // kg P2O5/ha
    fertilizerK: number; // kg K2O/ha
    limestone: number;   // kg calcário/ha
    dieselPerHectare: number; // L/ha
    yieldPerHectare: number;  // ton/ha (produtividade)
}

// Steps 4, 5, 6 & 7: Fase Industrial
export interface IndustrialData {
    // Consumo Energético
    electricityGrid: number; // kWh/ano (Rede)
    electricitySelf: number; // kWh/ano (Autogeração)
    biomassForHeat: number;  // ton/ano (Queimada para secagem)
    
    // Insumos do Processo (Opcionais baseados na planilha)
    lubricants?: number;     // kg/ano
    additives?: number;      // kg/ano
    
    // Distância de Insumos até a Fábrica
    distanceBiomassToFactory: number; // km
}

// Steps 8 & 9: Logística e Distribuição
export interface LogisticsData {
    // Mercado Doméstico
    domesticDistance: number; // km
    domesticModes: {
        roadPercentage: number; // 0-100
        railPercentage: number;
        waterPercentage: number;
    };
    roadVehicleType: RoadVehicleType;

    // Mercado Externo (Exportação)
    isExported: boolean;
    exportedVolume?: number; // ton
    distanceFactoryToPort?: number; // km
    portRoadVehicleType?: RoadVehicleType;
    shipType?: ShipType;
    distancePortToClient?: number; // km (marítimo + terrestre final)
}

// Step 10: Volume Final
export interface ProductionData {
    totalProductionVolume: number; // ton/ano (Pellets/Briquetes)
}

// --- OBJETO MESTRE DO PROJETO ---
export interface ProjectPayload {
    id?: number; // Opcional (novo projeto)
    currentStep: number;
    status: 'Em Andamento' | 'Concluído';
    
    // Dados segmentados
    identification: IdentificationData;
    biomass: BiomassData;
    agricultural: AgriculturalData; // Pode ser vazio se for resíduo
    industrial: IndustrialData;
    logistics: LogisticsData;
    production: ProductionData;
    
    // Resultados (Preenchidos pelo Backend após Step 10)
    results?: {
        carbonIntensity: number; // gCO2eq/MJ
        efficiencyScore: number; // Nota
        eligibleCbios: number;
        emissionsByPhase: {
            agricultural: number;
            industrial: number;
            transport: number;
        }
    };
}