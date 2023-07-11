import type { IName } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface INature {
  id: number;
  name: string;
  decreased_stat: INamedApiResource;
  increased_stat: INamedApiResource;
  hates_flavor: INamedApiResource;
  likes_flavor: INamedApiResource;
  pokeathlon_stat_changes: INatureStatChange[];
  move_battle_style_preference: IMoveBattleStylePreference[];
  names: IName[];
}

export interface INatureStatChange {
  max_change: number;
  pokeathlon_stat: INamedApiResource;
}

export interface IMoveBattleStylePreference {
  low_hp_preference: number;
  high_hp_preference: number;
  move_battle_style: INamedApiResource;
}
