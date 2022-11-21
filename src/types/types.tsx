export type Sort = {
    a: {
        name: string
    };
    b: {
        name: string
    };
};

export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    weight: number;
    sprites: {
        back_default: string
        back_female: string | null
        back_shiny: string
        back_shiny_female: string | null
        front_default: string
        front_female: string | null
        front_shiny: string
        front_shiny_female: string | null
    }
    types: {
        type: {
            name: string
        }
    }[]
}

export type Move = {
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
    effect_entries: any[];
    flavor_text_entries: {
        flavor_text: string
        language: {
            name: string
        }
        version_group: {
            name: string
        }
    }[];
    stat_changes: any[];
    past_values: any[];
    target: any;
}

export type Evolution = {

}

export type Machines = {
    item: {
        name: string
    };
    move: {
        name: string
    };
    version_group: {
        name: string
    };
}