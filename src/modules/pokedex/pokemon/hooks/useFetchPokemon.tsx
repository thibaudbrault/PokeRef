import { IPokemon } from '@/types/Pokemon/Pokemon';
import {
  getCards,
  getEvolution,
  getPokemon,
  getPokemonLocation,
  getPokemonTypes,
  getSpecies,
} from '@/utils/DataFetch';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const useFetchPokemon = (name: string) => {
  const [pokemonId, setPokemonId] = useState<number | null>(null);

  const [pokemon, location, cards] = useQueries({
    queries: [
      {
        queryKey: [`pokemon`, name],
        queryFn: () => getPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`),
        onSuccess: (data: IPokemon) => {
          setPokemonId(data.id);
        },
      },
      {
        queryKey: [`encounter`, name],
        queryFn: () =>
          getPokemonLocation(
            `https://pokeapi.co/api/v2/pokemon/${name}/encounters`,
          ),
      },
      {
        queryKey: [`cards`, name],
        queryFn: () => getCards(name),
      },
    ],
  });

  const types = useQuery({
    queryKey: [`types`, name, pokemon.data],
    queryFn: () => getPokemonTypes(pokemon.data),
    enabled: !!pokemon.data && pokemon.data.id < 10000,
  });

  const species = useQuery({
    //eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [`species`, name, pokemon.data],
    queryFn: () =>
      getSpecies(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon.data.id}`,
      ),
    enabled: !!pokemon.data && pokemon.data.id < 10000,
  });

  const evolutionChainUrl = species.data?.evolution_chain?.url;

  const evolution = useQuery({
    queryKey: [`evolution`, name, evolutionChainUrl],
    queryFn: () => getEvolution(evolutionChainUrl),
    enabled: !!evolutionChainUrl,
  });

  return {
    pokemonId,
    pokemon,
    species,
    types,
    location,
    evolution,
    cards,
  };
};
