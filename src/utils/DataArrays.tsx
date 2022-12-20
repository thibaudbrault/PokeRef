type DataMap = {
  [key: string]: string;
};

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
};

export const generations: Record<string, string> = {
  1: `generation I`,
  2: `generation II`,
  3: `generation III`,
  4: `generation IV`,
  5: `generation V`,
  6: `generation VI`,
  7: `generation VII`,
  8: `generation VIII`,
}

export const genFilters = [
  { generation: `gen1`, offset: 0, limit: 151 },
  { generation: `gen2`, offset: 151, limit: 100 },
  { generation: `gen3`, offset: 251, limit: 135 },
  { generation: `gen4`, offset: 386, limit: 107 },
  { generation: `gen5`, offset: 493, limit: 156 },
  { generation: `gen6`, offset: 649, limit: 72 },
  { generation: `gen7`, offset: 721, limit: 88 },
  { generation: `gen8`, offset: 809, limit: 96 },
];

export const formFilters = [
  { form: `regional - alola`, offset: 995, limit: 30 },
  { form: `regional - galar`, offset: 1065, limit: 25 },
  { form: `regional - hisui`, offset: 1133, limit: 20 },
  { form: `mega`, offset: 937, limit: 70 },
  { form: `gmax`, offset: 1099, limit: 40 },
];

export const typeFilters = [
  { type: 'bug' },
  { type: 'dark' },
  { type: 'dragon' },
  { type: 'electric' },
  { type: 'fairy' },
  { type: 'fighting' },
  { type: 'fire' },
  { type: 'flying' },
  { type: 'ghost' },
  { type: 'grass' },
  { type: 'ground' },
  { type: 'ice' },
  { type: 'normal' },
  { type: 'poison' },
  { type: 'psychic' },
  { type: 'rock' },
  { type: 'steel' },
  { type: 'water' },
];

export const speciesFilters = [
  {
    game: `yellow`,
    version: `yellow`,
    min: 0,
    max: 152,
  },
  {
    game: `crystal`,
    version: `crystal`,
    min: 151,
    max: 252,
  },
  {
    game: `emerald`,
    version: `emerald`,
    min: 251,
    max: 387,
  },
  {
    game: `platinum`,
    version: `platinum`,
    min: 386,
    max: 494,
  },
  {
    game: `black-2`,
    version: `black-2-white-2`,
    min: 493,
    max: 650,
  },
  {
    game: `x`,
    version: `x-y`,
    min: 649,
    max: 722,
  },
  {
    game: `ultra-sword`,
    version: `ultra-sun-ultra-moon`,
    min: 721,
    max: 810,
  },
  {
    game: `sword`,
    version: `sword-shield`,
    min: 809,
    max: 898,
  },
];

// export const generations = [
// 	{
// 		game: 'red',
// 		version: 'red-blue',
// 		gen: 'Gen I'
// 	},
// 	{
// 		game: 'blue',
// 		version: 'red-blue',
// 		gen: 'Gen I'
// 	},
// 	{
// 		game: 'yellow',
// 		version: 'yellow',
// 		gen: 'Gen I'
// 	},
// 	{
// 		game: 'gold',
// 		version: 'gold-silver',
// 		gen: 'Gen II'
// 	},
// 	{
// 		game: 'silver',
// 		version: 'gold-silver',
// 		gen: 'Gen II'
// 	},
// 	{
// 		game: 'crystal',
// 		version: 'crystal',
// 		gen: 'Gen II'
// 	},
// 	{
// 		game: 'ruby',
// 		version: 'ruby-sapphire',
// 		gen: 'Gen III'
// 	},
// 	{
// 		game: 'sapphire',
// 		version: 'ruby-sapphire',
// 		gen: 'Gen III'
// 	},
// 	{
// 		game: 'emerald',
// 		version: 'emerald',
// 		gen: 'Gen III'
// 	},
// 	{
// 		game: 'firered',
// 		version: 'firered-leafgreen',
// 		gen: 'Gen III'
// 	},
// 	{
// 		game: 'leafgreen',
// 		version: 'firered-leafgreen',
// 		gen: 'Gen III'
// 	},
// 	{
// 		game: 'diamond',
// 		version: 'diamond-pearl',
// 		gen: 'Gen IV'
// 	},
// 	{
// 		game: 'pearl',
// 		version: 'diamond-pearl',
// 		gen: 'Gen IV'
// 	},
// 	{
// 		game: 'platinum',
// 		version: 'platinum',
// 		gen: 'Gen IV'
// 	},
// 	{
// 		game: 'heartgold',
// 		version: 'heartgold-soulsilver',
// 		gen: 'Gen IV'
// 	},
// 	{
// 		game: 'soulsilver',
// 		version: 'heartgold-soulsilver',
// 		gen: 'Gen IV'
// 	},
// 	{
// 		game: 'black',
// 		version: 'black-white',
// 		gen: 'Gen V'
// 	},
// 	{
// 		game: 'white',
// 		version: 'black-white',
// 		gen: 'Gen V'
// 	},
// 	{
// 		game: 'black-2',
// 		version: 'black-2-white-2',
// 		gen: 'Gen V'
// 	},

// 	{
// 		game: 'white-2',
// 		version: 'black-2-white-2',
// 		gen: 'Gen V'
// 	},
// 	{
// 		game: 'x',
// 		version: 'x-y',
// 		gen: 'Gen VI'
// 	},
// 	{
// 		game: 'y',
// 		version: 'x-y',
// 		gen: 'Gen VI'
// 	},
// 	{
// 		game: 'omega-ruby',
// 		version: 'omega-ruby-alpha-sapphire',
// 		gen: 'Gen VI'
// 	},
// 	{
// 		game: 'alpha-sapphire',
// 		version: 'omega-ruby-alpha-sapphire',
// 		gen: 'Gen VI'
// 	},
// 	{
// 		game: 'sun',
// 		version: 'sun-moon',
// 		gen: 'Gen VII'
// 	},
// 	{
// 		game: 'moon',
// 		version: 'sun-moon',
// 		gen: 'Gen VII'
// 	},
// 	{
// 		game: 'ultra-sun',
// 		version: 'ultra-sun-ultra-moon',
// 		gen: 'Gen VII'
// 	},
// 	{
// 		game: 'ultra-moon',
// 		version: 'ultra-sun-ultra-moon',
// 		gen: 'Gen VII'
// 	},
// 	{
// 		game: 'lets-go-pikachu',
// 		version: 'lets-go-pikachu-lets-go-eevee',
// 		gen: 'Gen VII'
// 	},

// 	{
// 		game: 'lets-go-eevee',
// 		version: 'lets-go-pikachu-lets-go-eevee',
// 		gen: 'Gen VII'
// 	},
// 	{
// 		game: 'sword',
// 		version: 'sword-shield',
// 		gen: 'Gen VIII'
// 	},
// 	{
// 		game: 'shield',
// 		version: 'sword-shield',
// 		gen: 'Gen VIII'
// 	}
// ];
