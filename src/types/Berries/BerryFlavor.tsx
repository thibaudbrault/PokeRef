import { IName } from '../Utility/CommonModels';
import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IBerryFlavor {
  id: number;
  name: string;
  berries: IFlavorBerryMap[];
  contest_type: INamedApiResource;
  names: IName[];
}

export interface IFlavorBerryMap {
  potency: number;
  berry: INamedApiResource;
}
