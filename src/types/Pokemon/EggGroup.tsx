import { IName } from '../Utility/CommonModels';
import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IEggGroup {
  id: number;
  name: string;
  names: IName[];
  pokemon_species: Array<INamedApiResource>;
}
