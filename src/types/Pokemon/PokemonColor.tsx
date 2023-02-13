import { IName } from '../Utility/CommonModels';
import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IPokemonColor {
  id: number;
  name: string;
  names: IName[];
  pokemon_species: INamedApiResource;
}
