import { IDescription } from '../Utility/CommonModels';
import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IMoveCategory {
  id: number;
  name: string;
  moves: Array<INamedApiResource>;
  descriptions: IDescription[];
}
