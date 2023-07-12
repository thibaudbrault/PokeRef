import type { IName } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IItemCategory {
  id: number;
  name: string;
  items: Array<INamedApiResource>;
  names: IName[];
  pocket: INamedApiResource;
}
