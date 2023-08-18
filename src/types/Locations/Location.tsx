import type { IGenerationGameIndex, IName } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface ILocation {
  id: number;
  name: string;
  region: INamedApiResource;
  names: IName[];
  game_indices: IGenerationGameIndex[];
  areas: Array<INamedApiResource>;
}
