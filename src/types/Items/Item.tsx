import type { IApiResource } from '../Utility/ApiResourceList';
import type {
  IGenerationGameIndex,
  IMachineVersionDetail,
  IName,
  IVerboseEffect,
  IVersionGroupFlavorText,
} from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';
import type { IItemCategory } from './ItemCategory';

export interface IItem {
  id: number;
  name: string;
  cost: number;
  fling_power: number;
  fling_effect: INamedApiResource;
  attributes: Array<INamedApiResource>;
  category: IItemCategory;
  effect_entries: IVerboseEffect[];
  flavor_text_entries: IVersionGroupFlavorText[];
  game_indices: IGenerationGameIndex[];
  names: IName[];
  sprites: IItemSprites;
  held_by_pokemon: IItemHolderPokemon[];
  baby_trigger_for: IApiResource;
  machines: IMachineVersionDetail[];
}

export interface IItemSprites {
  default: string;
}

export interface IItemHolderPokemon {
  pokemon: INamedApiResource;
  version_details: IItemHolderPokemonVersionDetail[];
}

export interface IItemHolderPokemonVersionDetail {
  rarity: string;
  version: INamedApiResource;
}
