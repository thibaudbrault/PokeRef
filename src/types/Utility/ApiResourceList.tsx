export interface IApiResource {
  url: string;
  endpoint?: string;
}

export interface IApiResourceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<IApiResource>;
}
