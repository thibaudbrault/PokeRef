import type { IName } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IEncounterConditionValue {
  id: number;
  name: string;
  condition: Array<INamedApiResource>;
  names: IName[];
}
