import type { IDescription, IName } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IMoveLearnMethod {
  id: number;
  name: string;
  descriptions: IDescription[];
  names: IName[];
  version_groups: Array<INamedApiResource>;
}
