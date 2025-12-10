// src/Types/Types.ts

// ============================================================================
// ENUMS & OPTIONS
// ============================================================================

export type BiomassType = 
    | 'Resíduo de Pinus'
    | 'Resíduo de Eucaliptus'
    | 'Carvão vegetal de eucalipto'
    | 'Casca de Amendoin'
    | 'Eucaliptus Virgem'
    | 'Pinus Virgem';

export type YesNo = 'Sim' | 'Não';

export const BRAZILIAN_STATES = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export const VEHICLE_TYPES = [
    'Caminhão Toco/Semipesado (16-32t)',
    'Carreta/Pesado (>32t)',
    'VUC',
    'Trem'
];

export const WOOD_RESIDUE_STAGES = [
    'Colheita',
    'Processamento',
    'Não se aplica'
];

// ============================================================================
// STEP 0: Identificação
// ============================================================================

export interface Step0IdentificationData {
    name: string;
    company_name?: string;
    cnpj?: string;
    state?: string;
    city?: string;
    tech_responsible?: string;
    phone?: string;
    email?: string;
}

// ============================================================================
// STEP 1: Produção de Biomassa
// ============================================================================

export interface Step1BiomassProductionData {
    biomass_type: BiomassType;
    biomass_consumption_known?: YesNo;
    biomass_consumption_value?: number;
    starch_input?: number;
}

// ============================================================================
// STEP 2: Mudança de Uso da Terra (MUT)
// ============================================================================

export interface Step2MUTData {
    production_state?: string;
    wood_residue_stage?: string;
}

// ============================================================================
// STEP 3: Transporte da Biomassa
// ============================================================================

export interface Step3BiomassTransportData {
    agr_transport_distance?: number;
    agr_transport_vehicle?: string;
}

// ============================================================================
// STEP 4: Dados do Sistema Industrial
// ============================================================================

export interface Step4IndustrialSystemData {
    has_cogeneration?: YesNo;
    biomass_processed?: number;
    biomass_cogeneration?: number;
}

// ============================================================================
// STEP 5: Consumo de Eletricidade
// ============================================================================

export interface Step5ElectricityData {
    elec_grid?: number;
    elec_solar?: number;
    elec_wind?: number;
    elec_hydro?: number;
    elec_biomass?: number;
    elec_other?: number;
}

// ============================================================================
// STEP 6: Consumo de Combustíveis
// ============================================================================

export interface Step6FuelsData {
    fuel_diesel?: number;
    fuel_gasoline?: number;
    fuel_ethanol?: number;
    fuel_biodiesel?: number;
    fuel_gnv?: number;
    fuel_lpg?: number;
    fuel_biomass?: number;
    fuel_other?: number;
}

// ============================================================================
// STEP 7: Outros Insumos
// ============================================================================

export interface Step7OtherInputsData {
    water_consumption?: number;
    input_lubricant?: number;
    input_chemical?: number;
    input_other?: number;
}

// ============================================================================
// STEP 8: Transporte Doméstico
// ============================================================================

export interface Step8DomesticTransportData {
    dom_mass?: number;
    dom_distance?: number;
    dom_modal_road_pct?: number;
    dom_modal_rail_pct?: number;
    dom_vehicle_type?: string;
}

// ============================================================================
// STEP 9: Transporte Exportação
// ============================================================================

export interface Step9ExportTransportData {
    exp_mass?: number;
    exp_factory_port_dist?: number;
    exp_modal_road_pct?: number;
    exp_modal_rail_pct?: number;
    exp_modal_water_pct?: number;
    exp_vehicle_port?: string;
    exp_port_consumer_dist?: number;
}

// ============================================================================
// STEP 10: Volume de Produção
// ============================================================================

export interface Step10ProductionVolumeData {
    production_volume: number;
}

// ============================================================================
// PROJECT PAYLOAD (Global State)
// ============================================================================

export interface ProjectPayload {
    currentStep: number;
    status?: string;
    
    // Step 0
    identification: Step0IdentificationData;
    
    // Steps 1-10
    step1?: Step1BiomassProductionData;
    step2?: Step2MUTData;
    step3?: Step3BiomassTransportData;
    step4?: Step4IndustrialSystemData;
    step5?: Step5ElectricityData;
    step6?: Step6FuelsData;
    step7?: Step7OtherInputsData;
    step8?: Step8DomesticTransportData;
    step9?: Step9ExportTransportData;
    step10?: Step10ProductionVolumeData;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ProjectResponse {
    id: number;
    name: string;
    status: string;
    current_step: number;
    message?: string;
}

export interface ProjectProgressResponse {
    id: number;
    name: string;
    status: string;
    current_step: number;
    total_steps: number;
    progress_percentage: number;
    can_calculate: boolean;
}

// ============================================================================
// LEGACY/MOCK TYPES (for compatibility with existing mock data)
// ============================================================================

export interface Project {
    id: number;
    name: string;
    biomass: string;
    status: string;
    carbonIntensity: number;
    cbios: number;
    date: string;
}