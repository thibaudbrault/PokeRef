import type { IDescription } from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IMoveCategory {
  id: number;
  name: string;
  moves: Array<INamedApiResource>;
  descriptions: IDescription[];
}
