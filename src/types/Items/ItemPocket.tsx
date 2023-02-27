import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IItemPocket {
  id: number;
  name: string;
  categories: Array<INamedApiResource>;
}
