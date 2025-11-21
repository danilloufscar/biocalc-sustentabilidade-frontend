import type { Project } from '../Types/Types';

export const RECENT_PROJECTS: Project[] = [
  { id: 1, name: 'Lote Pinus 2023-A', biomass: 'Resíduo de Pinus', status: 'Concluído', carbonIntensity: 0.0025, cbios: 18982, date: '20/10/2023' },
  { id: 2, name: 'Briquete Eucalipto Sul', biomass: 'Resíduo de Eucaliptus', status: 'Concluído', carbonIntensity: 0.0031, cbios: 12500, date: '15/11/2023' },
  { id: 3, name: 'Estudo Casca Amendoim', biomass: 'Casca de Amendoim', status: 'Em Rascunho', carbonIntensity: 0, cbios: 0, date: '19/11/2023' },
];

export const BIOMASS_OPTIONS = [
  'Resíduo de Pinus',
  'Resíduo de Eucaliptus',
  'Casca de Amendoim',
  'Bagaço de Cana',
  'Cavaco de Madeira'
];