import type { IName } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IEggGroup {
  id: number;
  name: string;
  names: IName[];
  pokemon_species: Array<INamedApiResource>;
}
