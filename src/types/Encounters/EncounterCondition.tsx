import type { IName } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IEncounterCondition {
  id: number;
  name: string;
  names: IName[];
  values: Array<INamedApiResource>;
}
