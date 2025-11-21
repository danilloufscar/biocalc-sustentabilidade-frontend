export type Page = 'login' | 'register' | 'dashboard' | 'calculator' | 'projects';

export interface Project {
  id: number;
  name: string;
  biomass: string;
  status: 'Concluído' | 'Em Rascunho';
  carbonIntensity: number;
  cbios: number;
  date: string;
}


export type UserType = {
    id: number;
    name: string;
    email: string;
};