import type { IName } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IMoveAilment {
  id: number;
  name: string;
  moves: Array<INamedApiResource>;
  names: IName[];
}
