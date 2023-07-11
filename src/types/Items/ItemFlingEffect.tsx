import type { IEffect } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IItemFlingEffect {
  id: number;
  name: string;
  effect_entries: IEffect[];
  items: Array<INamedApiResource>;
}
