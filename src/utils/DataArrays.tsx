export const learnMethod: Record<string, string> = {
  1: `level-up`,
  2: `machine`,
  3: `egg`,
  4: `tutor`,
};

export const regions: Record<string, string> = {
  1: `kanto`,
  2: `johto`,
  3: `hoenn`,
  4: `sinnoh`,
  5: `unova`,
  6: `kalos`,
  7: `alola`,
  8: `galar`,
  9: `hisui`,
  10: `paldea`,
};

export interface IOptions {
  value: string;
  label: string;
}

export interface IOptionsOffsetLimit extends IOptions {
  offset: number;
  limit: number;
}

export interface IOptionsFixed extends IOptions {
  isFixed?: boolean;
}

export const formOptions: IOptionsOffsetLimit[] = [
  { label: `Alola`, value: `alola`, offset: 1097, limit: 30 },
  { label: `Galar`, value: `galar`, offset: 1167, limit: 25 },
  { label: `Hisui`, value: `hisui`, offset: 1235, limit: 20 },
  { label: `Mega`, value: `mega`, offset: 1039, limit: 60 },
  { label: `Gmax`, value: `gmax`, offset: 1201, limit: 40 },
];

export const generationsOptions: IOptionsOffsetLimit[] = [
  { label: `Generation I`, value: `gen1`, offset: 0, limit: 151 },
  { label: `Generation II`, value: `gen2`, offset: 151, limit: 100 },
  { label: `Generation III`, value: `gen3`, offset: 251, limit: 135 },
  { label: `Generation IV`, value: `gen4`, offset: 386, limit: 107 },
  { label: `Generation V`, value: `gen5`, offset: 493, limit: 156 },
  { label: `Generation VI`, value: `gen6`, offset: 649, limit: 72 },
  { label: `Generation VII`, value: `gen7`, offset: 721, limit: 88 },
  { label: `Generation VIII`, value: `gen8`, offset: 809, limit: 96 },
  { label: `Generation IX`, value: `gen9`, offset: 905, limit: 105 },
];

export const typeOptions: IOptionsFixed[] = [
  { value: `bug`, label: `Bug`, isFixed: false },
  { value: `dark`, label: `Dark`, isFixed: false },
  { value: `dragon`, label: `Dragon`, isFixed: false },
  { value: `electric`, label: `Electric`, isFixed: false },
  { value: `fairy`, label: `Fairy`, isFixed: false },
  { value: `fighting`, label: `Fighting`, isFixed: false },
  { value: `fire`, label: `Fire`, isFixed: false },
  { value: `flying`, label: `Flying`, isFixed: false },
  { value: `ghost`, label: `Ghost`, isFixed: false },
  { value: `grass`, label: `Grass`, isFixed: false },
  { value: `ground`, label: `Ground`, isFixed: false },
  { value: `ice`, label: `Ice`, isFixed: false },
  { value: `normal`, label: `Normal`, isFixed: false },
  { value: `poison`, label: `Poison`, isFixed: false },
  { value: `psychic`, label: `Psychic`, isFixed: false },
  { value: `rock`, label: `Rock`, isFixed: false },
  { value: `steel`, label: `Steel`, isFixed: false },
  { value: `water`, label: `Water`, isFixed: false },
];

type PokemonFilters = {
  game: string;
  version: string;
  format: string;
  min: number;
  max: number;
}[];

export const pokemonFilters: PokemonFilters = [
  {
    game: `yellow`,
    version: `yellow`,
    format: `gen1`,
    min: 0,
    max: 152,
  },
  {
    game: `crystal`,
    version: `crystal`,
    format: `gen2`,
    min: 151,
    max: 252,
  },
  {
    game: `emerald`,
    version: `emerald`,
    format: `gen3`,
    min: 251,
    max: 387,
  },
  {
    game: `platinum`,
    version: `platinum`,
    format: `gen4`,
    min: 386,
    max: 494,
  },
  {
    game: `black-2`,
    version: `black-2-white-2`,
    format: `gen5`,
    min: 493,
    max: 650,
  },
  {
    game: `x`,
    version: `x-y`,
    format: `gen6`,
    min: 649,
    max: 722,
  },
  {
    game: `ultra-sun`,
    version: `ultra-sun-ultra-moon`,
    format: `gen7`,
    min: 721,
    max: 810,
  },
  {
    game: `sword`,
    version: `sword-shield`,
    format: `gen8`,
    min: 809,
    max: 898,
  },
  {
    game: `legends-arceus`,
    version: `legends-arceus`,
    format: `gen8`,
    min: 897,
    max: 905,
  },
  {
    game: `scarlet`,
    version: `scarlet-violet`,
    format: `gen9`,
    min: 904,
    max: 1011,
  },
];

interface IGenNav extends IOptions {
  details: {
    game: string;
    version: string;
  }[];
}

export const genNav: IGenNav[] = [
  {
    value: `gen1`,
    label: `Gen I`,
    details: [
      {
        game: `red`,
        version: `red-blue`,
      },
      {
        game: `blue`,
        version: `red-blue`,
      },
      {
        game: `yellow`,
        version: `yellow`,
      },
    ],
  },
  {
    value: `gen2`,
    label: `Gen II`,
    details: [
      {
        game: `gold`,
        version: `gold-silver`,
      },
      {
        game: `silver`,
        version: `gold-silver`,
      },
      {
        game: `crystal`,
        version: `crystal`,
      },
    ],
  },
  {
    value: `gen3`,
    label: `Gen III`,
    details: [
      {
        game: `ruby`,
        version: `ruby-sapphire`,
      },
      {
        game: `sapphire`,
        version: `ruby-sapphire`,
      },
      {
        game: `emerald`,
        version: `emerald`,
      },
      {
        game: `firered`,
        version: `firered-leafgreen`,
      },
      {
        game: `leafgreen`,
        version: `firered-leafgreen`,
      },
    ],
  },
  {
    value: `gen4`,
    label: `Gen IV`,
    details: [
      {
        game: `diamond`,
        version: `diamond-pearl`,
      },
      {
        game: `pearl`,
        version: `diamond-pearl`,
      },
      {
        game: `platinum`,
        version: `platinum`,
      },
      {
        game: `heartgold`,
        version: `heartgold-soulsilver`,
      },
      {
        game: `soulsilver`,
        version: `heartgold-soulsilver`,
      },
    ],
  },
  {
    value: `gen5`,
    label: `Gen V`,
    details: [
      {
        game: `black`,
        version: `black-white`,
      },
      {
        game: `white`,
        version: `black-white`,
      },
      {
        game: `black-2`,
        version: `black-2-white-2`,
      },

      {
        game: `white-2`,
        version: `black-2-white-2`,
      },
    ],
  },
  {
    value: `gen6`,
    label: `Gen VI`,
    details: [
      {
        game: `x`,
        version: `x-y`,
      },
      {
        game: `y`,
        version: `x-y`,
      },
      {
        game: `omega-ruby`,
        version: `omega-ruby-alpha-sapphire`,
      },
      {
        game: `alpha-sapphire`,
        version: `omega-ruby-alpha-sapphire`,
      },
    ],
  },
  {
    value: `gen7`,
    label: `Gen VII`,
    details: [
      {
        game: `sun`,
        version: `sun-moon`,
      },
      {
        game: `moon`,
        version: `sun-moon`,
      },
      {
        game: `ultra-sun`,
        version: `ultra-sun-ultra-moon`,
      },
      {
        game: `ultra-moon`,
        version: `ultra-sun-ultra-moon`,
      },
      {
        game: `lets-go-pikachu`,
        version: `lets-go-pikachu-lets-go-eevee`,
      },

      {
        game: `lets-go-eevee`,
        version: `lets-go-pikachu-lets-go-eevee`,
      },
    ],
  },
  {
    value: `gen8`,
    label: `Gen VIII`,
    details: [
      {
        game: `sword`,
        version: `sword-shield`,
      },
      {
        game: `shield`,
        version: `sword-shield`,
      },
      {
        game: `brilliant-diamond`,
        version: `brilliant-diamond-and-shining-pearl`,
      },
      {
        game: `shining-pearl`,
        version: `brilliant-diamond-and-shining-pearl`,
      },
      {
        game: `legends-arceus`,
        version: `legends-arceus`,
      },
    ],
  },
  {
    value: `gen9`,
    label: `Gen IX`,
    details: [
      {
        game: `scarlet`,
        version: `scarlet-violet`,
      },
      {
        game: `violet`,
        version: `scarlet-violet`,
      },
    ],
  },
];

type Natures = {
  name: string;
  positive: string;
  negative: string;
};

export const pokemonNatures: Natures[] = [
  { name: `Adamant`, positive: `Attack`, negative: `Sp-Atk` },
  { name: `Bashful`, positive: `None`, negative: `None` },
  { name: `Bold`, positive: `Defense`, negative: `Attack` },
  { name: `Brave`, positive: `Attack`, negative: `Speed` },
  { name: `Calm`, positive: `Sp-Def`, negative: `Attack` },
  { name: `Careful`, positive: `Sp-Def`, negative: `Sp-Atk` },
  { name: `Docile`, positive: `None`, negative: `None` },
  { name: `Gentle`, positive: `Sp-Def`, negative: `Defense` },
  { name: `Hardy`, positive: `None`, negative: `None` },
  { name: `Hasty`, positive: `Speed`, negative: `Defense` },
  { name: `Impish`, positive: `Defense`, negative: `Sp-Atk` },
  { name: `Jolly`, positive: `Speed`, negative: `Sp-Atk` },
  { name: `Lax`, positive: `Defense`, negative: `Sp-Def` },
  { name: `Lonely`, positive: `Attack`, negative: `Defense` },
  { name: `Mild`, positive: `Sp-Atk`, negative: `Defense` },
  { name: `Modest`, positive: `Sp-Atk`, negative: `Attack` },
  { name: `Naive`, positive: `Speed`, negative: `Sp-Def` },
  { name: `Naughty`, positive: `Attack`, negative: `Sp-Def` },
  { name: `Quiet`, positive: `Sp-Atk`, negative: `Speed` },
  { name: `Quirky`, positive: `None`, negative: `none` },
  { name: `Rash`, positive: `Sp-Atk`, negative: `Sp-Def` },
  { name: `Relaxed`, positive: `Defense`, negative: `Speed` },
  { name: `Sassy`, positive: `Sp-Def`, negative: `Speed` },
  { name: `Serious`, positive: `None`, negative: `None` },
  { name: `Timid`, positive: `Speed`, negative: `Attack` },
];

export const formatOptions = [
  { value: `gen9vgc2023`, label: `Gen 9 - VGC 2023` },
  { value: `gen9ou`, label: `Gen 9 - OverUsed` },
  { value: `gen9uu`, label: `Gen 9 - UnderUsed` },
  { value: `gen9monotype`, label: `Gen 9 - Monotype` },
  { value: `gen9ubers`, label: `Gen 9 - Ubers` },
  { value: `gen9lc`, label: `Gen 9 - Little cup` },
  // { value: '', label: '' },
];
