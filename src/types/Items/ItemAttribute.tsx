import type { IDescription, IName } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IItemAttribute {
  id: number;
  name: string;
  items: Array<INamedApiResource>;
  names: IName[];
  descriptions: IDescription[];
}
