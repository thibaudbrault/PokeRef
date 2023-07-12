import type { IName } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IPalParkArea {
  id: number;
  name: string;
  names: IName[];
  pokemon_encounters: IPalParkEncounterSpecies[];
}

export interface IPalParkEncounterSpecies {
  base_socre: number;
  rate: number;
  pokemon_species: INamedApiResource;
}
