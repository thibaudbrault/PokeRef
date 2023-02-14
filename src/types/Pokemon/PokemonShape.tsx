import { IName } from '../Utility/CommonModels';
import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IPokemonShape {
  id: number;
  name: string;
  awesome_names: IAwesomeName[];
  names: IName[];
  pokemons_species: Array<INamedApiResource>;
}

export interface IAwesomeName {
  awesome_name: string;
  language: INamedApiResource;
}
