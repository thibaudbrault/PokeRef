import { IEvolutionChain } from "@/types/Evolution/EvolutionChain"
import { IPokemon, IPokemonStat } from "@/types/Pokemon/Pokemon"
import { IPokemonSpecies } from "@/types/Pokemon/PokemonSpecies"
import { removeDash } from "@/utils/Typography"
import Link from "next/link"

interface Pokemon {
    pokemon: IPokemon;
}

interface PokemonSpecies extends Pokemon {
    species: IPokemonSpecies;
}

interface PokemonEvolution extends Pokemon {
    evolution: IEvolutionChain;
}

interface PokemonGender extends PokemonSpecies {
    male: number;
    female: number;
}

export const InfoTable = [
    {
        category: 'breeding',
        desc_1: {
            title: "gender",
            value: ({ pokemon, species, male, female }: PokemonGender) => {
                return pokemon.id < 10000 ? (
                    species?.gender_rate !== -1 ? (
                        <p>
                            {male}% male
                            <br />
                            {female}% female
                        </p>
                    ) : (
                        'genderless'
                    )
                ) : (
                    `⠀`
                )
            }
        },
        desc_2: {
            title: "egg groups",
            value: ({ pokemon, species }: PokemonSpecies) => {
                return (
                    pokemon.id < 10000
                        ? species?.egg_groups?.map((seg) => (
                            <p key={seg.name}>{seg.name}</p>
                        ))
                        : `⠀`
                )
            }
        },
        desc_3: {
            title: "egg cycles",
            value: ({ pokemon, species }: PokemonSpecies) => {
                return (
                    pokemon.id < 10000 ?
                        `${species.hatch_counter} cycles (${species.hatch_counter} * 256 steps)`
                        : `⠀`
                )
            }
        },
        desc_4: {
            title: "baby trigger item",
            value: ({ pokemon, evolution }: PokemonEvolution) => {
                return (
                    pokemon.id < 10000 && evolution?.baby_trigger_item !== null ? (
                        removeDash(evolution?.baby_trigger_item?.name)
                    ) : (
                        `None`
                    )
                )
            }
        },
        desc_5: {
            title: "habitat",
            value: ({ pokemon, species }: PokemonSpecies) => {
                return (
                    pokemon.id < 10000 ? (
                        species?.habitat !== null ? (
                            species.habitat.name
                        ) : (
                            `Undiscovered`
                        )
                    ) : (
                        `⠀`
                    )
                )
            }
        },
    },
    {
        category: 'training',
        desc_1: {
            title: "EV yield",
            value: ({ pokemon }: Pokemon) => {
                return (
                    pokemon.stats.filter((ps: IPokemonStat) => ps.effort !== 0).map(ps => (
                        <span>
                            {ps?.effort}
                            {` `}
                            {removeDash(ps?.stat.name)}
                        </span>
                    )))
            }
        },
        desc_2: {
            title: "catch rate",
            value: ({ pokemon, species }: PokemonSpecies) => {
                return (
                    pokemon.id < 10000 ? species.capture_rate : `⠀`
                )
            }
        },
        desc_3: {
            title: "base happiness",
            value: ({ pokemon, species }: PokemonSpecies) => {
                return (
                    pokemon.id < 10000 ? species.base_happiness : `⠀`
                )
            }
        },
        desc_4: {
            title: "base XP",
            value: ({ pokemon }: Pokemon) => {
                return (
                    pokemon.base_experience
                )
            }
        },
        desc_5: {
            title: "growth rate",
            value: ({ pokemon, species }: PokemonSpecies) => {
                return (
                    pokemon.id < 10000 ? (
                        removeDash(species.growth_rate.name)
                    ) : (
                        `⠀`
                    )
                )
            }
        },
        desc_6: {
            title: "held items",
            value: ({ pokemon }: Pokemon) => {
                return (
                    pokemon?.held_items?.length > 0
                        ? pokemon?.held_items?.map((ph) => (
                            <Link
                                href={{
                                    pathname: `/item/[name]`,
                                    query: { name: ph.item.name },
                                }}
                                key={ph.item.name}
                            >
                                {removeDash(ph.item.name)}
                            </Link>
                        ))
                        : `None`
                )
            }
        }
    },
    {
        category: "forms",
        desc_1: {
            title: "alternative forms",
            value: ({ pokemon, species }: PokemonSpecies) => {
                return (
                    pokemon.id < 10000
                        ? species.forms_switchable === true
                            ? `Yes`
                            : `No`
                        : `⠀`
                )
            }
        },
        desc_2: {
            title: "varieties",
            value: ({ pokemon, species }: PokemonSpecies) => {
                return (
                    pokemon.id < 10000
                        ? species.varieties?.map((sv) => (
                            <Link
                                href={{
                                    pathname: `/pokemon/[name]`,
                                    query: { name: sv.pokemon.name },
                                }}
                                key={sv.pokemon.name}
                            >
                                {removeDash(sv.pokemon.name)}
                            </Link>
                        ))
                        : `⠀`
                )
            }
        },
        desc_3: {
            title: "gender differences",
            value: ({ pokemon, species }: PokemonSpecies) => {
                return (
                    pokemon.id < 10000
                        ? species.has_gender_differences === true
                            ? `Yes`
                            : `No`
                        : `⠀`
                )
            }
        }
    }
]
