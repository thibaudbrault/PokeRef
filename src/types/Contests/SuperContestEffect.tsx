import type { IFlavorText } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface ISuperContestEffect {
  id: number;
  name: string;
  flavor_text_entries: IFlavorText[];
  moves: Array<INamedApiResource>;
}
