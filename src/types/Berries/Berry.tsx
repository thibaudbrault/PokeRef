import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IBerry {
  id: number;
  name: string;
  growth_time: number;
  max_harvest: number;
  natural_gift_power: number;
  size: number;
  smoothness: number;
  soil_dryness: number;
  firmness: INamedApiResource;
  flavors: IBerryFlavorMap[];
  item: INamedApiResource;
  natural_gift_type: INamedApiResource;
}

export interface IBerryFlavorMap {
  potency: number;
  flavor: INamedApiResource;
}
