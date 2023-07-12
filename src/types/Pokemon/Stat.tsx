import type { IApiResource } from '../Utility/ApiResourceList';
import type { IName } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IStat {
  id: number;
  name: string;
  name_index: number;
  is_battle_only: boolean;
  affecting_moves: IMoveStatAffectSets;
  affecting_natures: INatureStatAffectSets;
  characteristics: IApiResource;
  move_damage_class: INamedApiResource;
  names: IName[];
}

export interface IMoveStatAffectSets {
  increase: IMoveStatAffect[];
  decrease: IMoveStatAffect[];
}

export interface IMoveStatAffect {
  change: number;
  move: INamedApiResource;
}

export interface INatureStatAffectSets {
  increase: Array<INamedApiResource>;
  decrease: Array<INamedApiResource>;
}
