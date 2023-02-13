import { IName } from '../Utility/CommonModels';
import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IEncounterCondition {
  id: number;
  name: string;
  names: IName[];
  values: Array<INamedApiResource>;
}
