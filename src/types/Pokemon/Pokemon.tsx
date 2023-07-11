import type {
  IVersionEncounterDetail,
  IVersionGameIndex,
} from '../Utility/CommonModels';
import type { INamedApiResource } from '../Utility/NamedApiResourceList';

export interface IPokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: IPokemonAbility[];
  forms: Array<INamedApiResource>;
  game_indices: IVersionGameIndex[];
  held_items: IPokemonHeldItem[];
  location_area_encounters: string;
  moves: IPokemonMove[];
  past_types: IPastTypes[];
  sprites: IPokemonSprites;
  species: INamedApiResource;
  stats: IPokemonStat[];
  types: IPokemonType[];
}

export interface IPokemonAbility {
  is_hidden: true;
  slot: number;
  ability: INamedApiResource;
}

export interface IPokemonType {
  slot: number;
  type: INamedApiResource;
}

export interface IPokemonHeldItem {
  item: INamedApiResource;
  version_details: IPokemonHeldItemVersion[];
}

export interface IPokemonHeldItemVersion {
  version: INamedApiResource;
  rarity: number;
}

export interface IPokemonMove {
  move: INamedApiResource;
  version_group_details: IPokemonMoveVersion[];
}

export interface IPokemonMoveVersion {
  move_learn_method: INamedApiResource;
  version_group: INamedApiResource;
  level_learned_at: number;
}

export interface IPokemonStat {
  stat: INamedApiResource;
  effort: number;
  base_stat: number;
}

export interface IPastTypes {
  generation: INamedApiResource;
  types: IPokemonType[];
}

export interface IPokemonSprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: IPokemonSpriteOther;
  versions: IPokemonSpriteVersion;
}

interface ISpriteVariant {
  back_default: string | null;
  back_female: string | null;
  back_gray: string | null;
  back_transparent: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  back_shiny_transparent: string | null;
  front_default: string | null;
  front_female: string | null;
  front_gray: string | null;
  front_transparent: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  front_shiny_transparent: string | null;
}

export interface IPokemonSpriteOther {
  dream_world: Pick<ISpriteVariant, 'front_default' | 'front_female'>;
  'official-artwork': {
    front_default: string;
  };
}

interface IGeneration1Sprite {
  'red-blue': Pick<
    ISpriteVariant,
    | 'back_default'
    | 'back_gray'
    | 'back_transparent'
    | 'front_default'
    | 'front_gray'
    | 'front_transparent'
  >;
  yellow: Pick<
    ISpriteVariant,
    | 'back_default'
    | 'back_gray'
    | 'back_transparent'
    | 'front_default'
    | 'front_gray'
    | 'front_transparent'
  >;
}

interface IGeneration2Sprite {
  crystal: Pick<
    ISpriteVariant,
    | 'back_default'
    | 'back_shiny'
    | 'back_transparent'
    | 'back_shiny_transparent'
    | 'front_default'
    | 'front_shiny'
    | 'front_transparent'
    | 'front_shiny_transparent'
  >;
  gold: Pick<
    ISpriteVariant,
    | 'back_default'
    | 'back_shiny'
    | 'front_default'
    | 'front_shiny'
    | 'front_transparent'
  >;
  silver: Pick<
    ISpriteVariant,
    | 'back_default'
    | 'back_shiny'
    | 'front_default'
    | 'front_shiny'
    | 'front_transparent'
  >;
}

interface IGeneration3Sprite {
  emerald: Pick<ISpriteVariant, 'front_default' | 'front_shiny'>;
  'firered-leafgreen': Pick<
    ISpriteVariant,
    'back_default' | 'back_shiny' | 'front_default' | 'front_shiny'
  >;
  'ruby-sapphire': Pick<
    ISpriteVariant,
    'back_default' | 'back_shiny' | 'front_default' | 'front_shiny'
  >;
}

interface IGeneration4Sprite {
  'diamond-pearl': Pick<
    ISpriteVariant,
    | 'back_default'
    | 'back_female'
    | 'back_shiny'
    | 'back_shiny_female'
    | 'front_default'
    | 'front_female'
    | 'front_shiny'
    | 'front_shiny_female'
  >;
  'heartgold-soulsilver': Pick<
    ISpriteVariant,
    | 'back_default'
    | 'back_female'
    | 'back_shiny'
    | 'back_shiny_female'
    | 'front_default'
    | 'front_female'
    | 'front_shiny'
    | 'front_shiny_female'
  >;
  platinum: Pick<
    ISpriteVariant,
    | 'back_default'
    | 'back_female'
    | 'back_shiny'
    | 'back_shiny_female'
    | 'front_default'
    | 'front_female'
    | 'front_shiny'
    | 'front_shiny_female'
  >;
}

type IBlackWhiteSprite = Pick<
  ISpriteVariant,
  | 'back_default'
  | 'back_female'
  | 'back_shiny'
  | 'back_shiny_female'
  | 'front_default'
  | 'front_female'
  | 'front_shiny'
  | 'front_shiny_female'
>;

interface IGeneration5Sprite {
  'black-white': IBlackWhiteSprite & { animated: IBlackWhiteSprite };
}

interface IGeneration6Sprite {
  'omegaruby-alphasapphire': Pick<
    ISpriteVariant,
    'front_default' | 'front_female' | 'front_shiny' | 'front_shiny_female'
  >;
  'x-y': Pick<
    ISpriteVariant,
    'front_default' | 'front_female' | 'front_shiny' | 'front_shiny_female'
  >;
}

interface IGeneration7Sprite {
  icons: Pick<ISpriteVariant, 'front_default' | 'front_female'>;
  'ultra-sun-ultra-moon': Pick<
    ISpriteVariant,
    'front_default' | 'front_female' | 'front_shiny' | 'front_shiny_female'
  >;
}

interface IGeneration8Sprite {
  icons: Pick<ISpriteVariant, 'front_default' | 'front_female'>;
}

interface IPokemonSpriteVersion {
  'generation-i': IGeneration1Sprite;
  'generation-ii': IGeneration2Sprite;
  'generation-iii': IGeneration3Sprite;
  'generation-iv': IGeneration4Sprite;
  'generation-v': IGeneration5Sprite;
  'generation-vi': IGeneration6Sprite;
  'generation-vii': IGeneration7Sprite;
  'generation-viii': IGeneration8Sprite;
}

export interface ILocationAreaEncounter {
  location_area: INamedApiResource;
  version_details: IVersionEncounterDetail[];
}
