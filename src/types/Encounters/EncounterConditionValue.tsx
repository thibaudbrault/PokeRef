import { IName } from '../Utility/CommonModels';
import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IEncounterConditionValue {
  id: number;
  name: string;
  condition: Array<INamedApiResource>;
  names: IName[];
}
