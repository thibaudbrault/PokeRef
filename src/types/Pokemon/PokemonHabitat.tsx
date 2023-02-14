import { IName } from '../Utility/CommonModels';
import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IPokemonHabitat {
  id: number;
  name: string;
  names: IName[];
  pokemon_species: Array<INamedApiResource>;
}
