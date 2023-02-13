import { IDescription, IName } from '../Utility/CommonModels';
import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IMoveTarget {
  id: number;
  name: string;
  descriptions: IDescription[];
  moves: Array<INamedApiResource>;
  names: IName[];
}
