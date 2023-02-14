import { IName } from '../Utility/CommonModels';
import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IBerryFirmness {
  id: number;
  name: string;
  berries: Array<INamedApiResource>;
  names: IName[];
}
