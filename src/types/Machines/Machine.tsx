import { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IMachine {
  id: number;
  item: INamedApiResource;
  move: INamedApiResource;
  version_group: INamedApiResource;
}
