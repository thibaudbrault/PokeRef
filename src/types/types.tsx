export type Sort = {
  a: {
    name: string;
  };
  b: {
    name: string;
  };
};

export type PokemonMoves = {
  move: {
    name: string;
  };
  version_group_details: {
    level_learned_at: number;
    version_group: {
      name: string;
    };
    move_learn_method: {
      name: string;
    };
  };
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  weight: number;
  moves: PokemonMoves[];
  held_items: {
    item: {
      name: string;
    };
  }[];
  sprites: {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
};

export type Moves = {
  id: number;
  name: string;
  pp: number;
  type: {
    name: string;
  };
  damage_class: {
    name: string;
  };
  accuracy: number;
  priority: number;
  power: number;
  meta: {
    ailment_chance: number;
    crit_rate: number;
    drain: number;
    flinch_chance: number;
    healing: number;
    min_hits: number | null;
    max_hits: number | null;
    min_turns: number | null;
    max_turns: number | null;
    ailment: {
      name: string;
    };
  };
  effect_entries: {
    effect: string;
    language: {
      name: string;
    };
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
    version_group: {
      name: string;
    };
  }[];
  stat_changes: {
    change: number;
    stat: {
      name: string;
    };
  }[];
  past_values: {
    accuracy: number;
    power: number;
    pp: number;
    type: string;
    version_group: {
      name: string;
    };
  }[];
  target: {
    name: string;
  };
};

export type Abilities = {
  name: string;
  flavor_text_entries: {
    language: {
      name: string;
    };
    flavor_text: string;
  }[];
};

export type Types = {
  name: string;
};

export type Machines = {
  item: {
    name: string;
  };
  move: {
    name: string;
  };
  version_group: {
    name: string;
  };
};

export type Items = {
  name: string;
  category: {
    name: string;
  };
  effect_entries: {
    short_effect: string;
  }[];
  sprites: {
    default: string;
  };
};

export type Locations = {
  name: string;
  locations: {
    name: string;
  }[];
};

export type Species = {
  gender_rate: number;
  hatch_counter: number;
  capture_rate: number;
  base_happiness: number;
  forms_switchable: boolean;
  has_gender_differences: boolean;
  habitat: {
    name: string;
  };
  egg_groups: {
    name: string;
  }[];
  growth_rate: {
    name: string;
  };
  varieties: {
    is_default: boolean;
    pokemon: {
      name: string;
    };
  }[];
};

export type Evolution = {
  baby_trigger_item: {
    name: string;
  };
};
