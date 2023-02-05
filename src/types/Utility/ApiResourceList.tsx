
export interface IApiResource {
  url: string;
  endpoint?: string;
}

export interface IApiResourceList<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<IApiResource>;
}
