import { IName } from '../Utility/CommonModels';
import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IMoveAilment {
  id: number;
  name: string;
  moves: Array<INamedApiResource>;
  names: IName[];
}
