export interface IFormatStats {
  battles: number;
  metagame: IMetagame;
  pokemon: IPokemonFormat;
}

export interface IMetagame {
  stalliness: IStalliness;
  tags: { [key: string]: number };
}

export interface IStalliness {
  histogram: number[][];
  mean: number;
  total: number;
}

export interface IPokemonFormat {
  abilities: { [key: string]: number };
  count: number;
  counters: { [key: string]: number };
  happinesses: { [key: string]: number };
  items: { [key: string]: number };
  lead: IPokemonStats;
  moves: { [key: string]: number };
  spreads: { [key: string]: number };
  teammates: { [key: string]: number };
  usage: IPokemonStats;
  viability: number[];
  weight: number;
}

export interface IPokemonStats {
  raw: number;
  real: number;
  weighted: number;
}
