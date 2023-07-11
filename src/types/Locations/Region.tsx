import type { IName } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IRegion {
  id: number;
  locations: Array<INamedApiResource>;
  name: string;
  names: IName[];
  main_generation: INamedApiResource;
  pokedexes: Array<INamedApiResource>;
  version_groups: Array<INamedApiResource>;
}
