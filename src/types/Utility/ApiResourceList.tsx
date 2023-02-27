export interface IApiResource {
  url: string;
  endpoint?: string;
}

export interface IApiResourceList {
  count: number;
  next: string;
  previous: string;
  results: Array<IApiResource>;
}
