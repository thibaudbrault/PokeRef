import { IEffect } from '../Utility/CommonModels';
import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IItemFlingEffect {
  id: number;
  name: string;
  effect_entries: IEffect[];
  items: Array<INamedApiResource>;
}
