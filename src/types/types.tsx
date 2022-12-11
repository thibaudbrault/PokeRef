export type BaseName = {
  id?: number;
  url: string;
  name: string;
};

export namespace Pokemon {
  export type Abilities = {
    is_hidden: boolean;
    ability: BaseName;
  };

  export type Moves = {
    move: BaseName;
    version_group_details: {
      level_learned_at: number;
      version_group: BaseName;
      move_learn_method: BaseName;
    }[];
  };

  export type HeldItems = {
    item: BaseName;
  };

  export type Sprites = {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
  };

  export type Stats = {
    base_stat: number;
    effort: number;
    stat: BaseName;
  };

  export type Types = {
    type: BaseName;
  };

  export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    weight: number;
    abilities: Abilities[];
    moves: Moves[];
    held_items: HeldItems[];
    sprites: Sprites;
    stats: Stats[];
    types: Types[];
  };

  export type PokemonLocationVersion = {
    encounter_details: {
      min_level: number;
      max_level: number;
      condition_value: BaseName[];
      chance: number;
      method: BaseName[];
    }[];
    version: BaseName;
  };

  export type PokemonLocation = {
    location_area: BaseName;
    version_details: PokemonLocationVersion[];
  };
}

export namespace Moves {
  export type Meta = {
    ailment_chance: number;
    crit_rate: number;
    drain: number;
    flinch_chance: number;
    healing: number;
    min_hits: number | null;
    max_hits: number | null;
    min_turns: number | null;
    max_turns: number | null;
    ailment: BaseName;
  };

  export type Effect = {
    effect: string;
    language: BaseName;
  };

  export type FlavorText = {
    flavor_text: string;
    language: BaseName;
    version_group: BaseName;
  };

  export type StatChanges = {
    change: number;
    stat: {
      name: string;
    };
  };

  export type PastValues = {
    accuracy: number;
    power: number;
    pp: number;
    type: string;
    version_group: BaseName;
  };

  export type Moves = {
    id: number;
    name: string;
    pp: number;
    type: BaseName;
    damage_class: BaseName;
    accuracy: number;
    priority: number;
    power: number;
    meta: Meta;
    effect_entries: Effect[];
    flavor_text_entries: FlavorText[];
    stat_changes: StatChanges[];
    past_values: PastValues[];
    target: BaseName;
  };

  export type Status = {
    id: number;
    name: string;
    moves: BaseName[];
  };
}

export namespace Abilities {
  export type FlavorText = {
    language: BaseName;
    flavor_text: string;
  };

  export type Abilities = {
    name: string;
    flavor_text_entries: FlavorText[];
  };
}

export namespace Types {
  export type DamageRelations = {
    half_damage_to: BaseName[];
    double_damage_to: BaseName[];
    no_damage_from: BaseName[];
    half_damage_from: BaseName[];
    double_damage_from: BaseName[];
    no_damage_to: BaseName[];
  };

  export type Pokemon = {
    pokemon: BaseName;
  };

  export type Types = {
    name: string;
    damage_relations: DamageRelations;
    moves: BaseName[];
    pokemon: Pokemon[];
    move_damage_class: BaseName;
  };
}

export namespace Machines {
  export type Machines = {
    item: BaseName;
    move: BaseName;
    version_group: BaseName;
  };
}

export namespace Items {
  export type EffectEntries = {
    effect: string;
    short_effect: string;
  };

  export type Items = {
    name: string;
    category: BaseName;
    effect_entries: EffectEntries[];
    sprites: {
      default: string;
    };
  };
}

export namespace Locations {
  export type Locations = {
    name: string;
    locations: BaseName[];
  };
}

export namespace Species {
  export type FlavorText = {
    flavor_text: string;
    language: BaseName;
    version: BaseName;
  };

  export type Genera = {
    genus: string;
    language: BaseName;
  };

  export type Varieties = {
    is_default: boolean;
    pokemon: BaseName;
  };

  export type Species = {
    gender_rate: number;
    hatch_counter: number;
    capture_rate: number;
    base_happiness: number;
    is_legendary: boolean;
    is_mythical: boolean;
    forms_switchable: boolean;
    has_gender_differences: boolean;
    shape: BaseName;
    color: BaseName;
    habitat: BaseName;
    egg_groups: BaseName[];
    growth_rate: BaseName;
    flavor_text_entries: FlavorText[];
    genera: Genera[];
    varieties: Varieties[];
  };
}

export namespace Evolution {
  export type EvolutionDetails = {
    gender?: number;
    held_item?: BaseName;
    item?: BaseName;
    known_move?: BaseName;
    known_move_type?: BaseName;
    location?: BaseName;
    min_affection?: number;
    min_beauty?: number;
    min_happiness?: number;
    min_level?: number;
    needs_overworld_rain?: boolean;
    party_species?: BaseName;
    party_type?: BaseName;
    relative_physical_stats?: number;
    time_of_day?: string;
    trade_species?: BaseName;
    trigger: BaseName;
    turn_upside_down?: boolean;
  };

  export type Chain = {
    evolution_details: EvolutionDetails[];
    evolves_to: Chain[];
    is_baby: boolean;
    species: BaseName;
  };

  export type Evolution = {
    baby_trigger_item?: BaseName;
    chain: Chain;
  };
}
