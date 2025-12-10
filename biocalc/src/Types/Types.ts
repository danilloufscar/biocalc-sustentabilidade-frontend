// src/Types.ts

// --- ENUMS & OPTIONS (Mantidos para Dropdowns) ---
export type BiomassType = 
    | 'Resíduo de Pinus'
    | 'Resíduo de Eucaliptus'
    | 'Casca de Amendoim'
    | 'Bagaço de Cana'
    | 'Cavaco de Madeira'
    | 'Outros';

// --- INTERFACES DE STEPS (Refletindo apenas Células Verdes da EngS_BioCalc) ---

// Step 0: Identificação (Mantido)
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

// Step 1: Produção de Biomassa (CORRIGIDO CONFORME PEDIDO)
// Linhas 33 a 38 da EngS_BioCalc
export interface BiomassData {
    type: BiomassType;
    
    // "Possui informação sobre o consumo de Biomassa?" (Sim/Não)
    biomassConsumptionKnown: 'Sim' | 'Não'; 
    
    // "Entrada de biomassa - dado específico" (Só preenche se acima for Sim)
    biomassConsumptionValue?: number; 
    
    // "Entrada de amido de milho"
    starchInput: number; 
}

// Steps 2 & 3: Transporte Agrícola e MUT
// Baseado nas Células Verdes das linhas ~42-50
export interface AgriculturalData {
    // Transporte da biomassa até a unidade (Células Verdes)
    transportDistance: number; // km
    transportVehicle: string;  // Tipo de veículo
    
    // Nota: A planilha esconde inputs de fertilizantes se for resíduo.
    // O Backend tratará isso. O Front manda o que tiver.
}

// Steps 4-7: Fase Industrial
// Baseado nas Células Verdes das linhas ~62-90
export interface IndustrialData {
    // Eletricidade
    electricityGrid: number; // kWh
    electricitySelf: number; // kWh
    
    // Combustíveis (Caldeira)
    fuelType?: string;
    fuelConsumption?: number;
    
    // Água
    waterConsumption: number; // Litros ou m³
}

// Steps 8-9: Logística (Mantido, pois já estava alinhado com EngS)
export interface LogisticsData {
    domesticDistance: number;
    domesticModes: {
        roadPercentage: number;
        railPercentage: number;
        waterPercentage: number;
    };
    roadVehicleType: string;

    isExported: boolean;
    exportedVolume?: number;
    distanceFactoryToPort?: number;
    portRoadVehicleType?: string;
    // Split modal até o porto
    exportModes?: {
        roadPercentage: number;
        railPercentage: number;
        waterPercentage: number;
    };
    distancePortToClient?: number;
}

// Step 10: Volume Final
export interface ProductionData {
    totalProductionVolume: number; // Toneladas
}

// OBJETO GLOBAL
export interface ProjectPayload {
    currentStep: number;
    identification: IdentificationData;
    biomass: BiomassData;
    agricultural: AgriculturalData;
    industrial: IndustrialData;
    logistics: LogisticsData;
    production: ProductionData;
}