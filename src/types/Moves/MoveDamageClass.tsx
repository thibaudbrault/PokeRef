import { IDescription, IName } from '../Utility/CommonModels';
import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IMoveDamageClass {
  id: number;
  name: string;
  descriptions: IDescription[];
  moves: Array<INamedApiResource>;
  names: IName[];
}
