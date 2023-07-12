import type { IName } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IBerryFirmness {
  id: number;
  name: string;
  berries: Array<INamedApiResource>;
  names: IName[];
}
