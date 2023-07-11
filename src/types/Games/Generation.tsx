import type { IName } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IGeneration {
  id: number;
  name: string;
  abilities: Array<INamedApiResource>;
  names: IName[];
  main_region: INamedApiResource;
  moves: Array<INamedApiResource>;
  pokemon_species: Array<INamedApiResource>;
  types: Array<INamedApiResource>;
  version_groups: Array<INamedApiResource>;
}
