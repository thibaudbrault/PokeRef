import type { IApiResource } from '../Utility/ApiResourceList';
import type { IDescription, IFlavorText, IName } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IPokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: INamedApiResource;
  pokedex_numbers: IPokemonSpeciesDexEntry[];
  egg_groups: Array<INamedApiResource>;
  color: INamedApiResource;
  shape: INamedApiResource;
  evolves_from_species: INamedApiResource;
  evolution_chain: IApiResource;
  habitat: INamedApiResource;
  generation: INamedApiResource;
  names: IName[];
  pal_park_encounters: IPalParkEnounterArea[];
  flavor_text_entries: IFlavorText[];
  form_descriptions: IDescription[];
  genera: IGenus[];
  varieties: IPokemonSpeciesVariety[];
}

export interface IGenus {
  genus: string;
  language: INamedApiResource;
}

export interface IPokemonSpeciesDexEntry {
  entry_number: number;
  pokedex: INamedApiResource;
}

export interface IPalParkEnounterArea {
  base_score: number;
  rate: number;
  area: INamedApiResource;
}

export interface IPokemonSpeciesVariety {
  is_default: boolean;
  pokemon: INamedApiResource;
}
