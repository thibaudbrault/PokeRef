import { IDescription } from '../Utility/CommonModels';
import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IGrowthRate {
  id: number;
  name: string;
  formula: string;
  descriptions: IDescription[];
  levels: IGrowthRateExperienceLevel[];
  pokemon_species: Array<INamedApiResource>;
}

export interface IGrowthRateExperienceLevel {
  level: number;
  experience: number;
}
