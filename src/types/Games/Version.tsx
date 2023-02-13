import { IName } from '../Utility/CommonModels';
import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IVersion {
  id: number;
  name: string;
  names: IName[];
  version_group: INamedApiResource;
}
