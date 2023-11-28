import { useState } from 'react';

import { useQueries, useQuery } from '@tanstack/react-query';

import {
  BASE_URL,
  QueryKeys,
  getCards,
  getPokemonTypes,
  getSingle,
} from '@/utils';

import type { IPokemon } from '@/types';

export const useFetchPokemon = (name: string) => {
  const [pokemonId, setPokemonId] = useState<number | null>(null);

  const [pokemon, location, cards] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.POKEMON.INDEX, name],
        queryFn: () => getSingle(`${BASE_URL}/pokemon/${name}`),
        onSuccess: (data: IPokemon) => {
          setPokemonId(data.id);
        },
      },
      {
        queryKey: [QueryKeys.ENCOUNTER.INDEX, name],
        queryFn: () => getSingle(`${BASE_URL}/pokemon/${name}/encounters`),
      },
      {
        queryKey: [QueryKeys.CARDS, name],
        queryFn: () => getCards(name),
      },
    ],
  });

  const types = useQuery({
    queryKey: [QueryKeys.TYPES, name, pokemon.data],
    queryFn: () => getPokemonTypes(pokemon.data),
    enabled: !!pokemon.data && pokemon.data.id < 10000,
  });

  const species = useQuery({
    //eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.SPECIES, name, pokemon.data],
    queryFn: () => getSingle(`${BASE_URL}/pokemon-species/${pokemon.data.id}`),
    enabled: !!pokemon.data && pokemon.data.id < 10000,
  });

  const evolutionChainUrl = species.data?.evolution_chain?.url;

  const evolution = useQuery({
    queryKey: [QueryKeys.EVOLUTION, name, evolutionChainUrl],
    queryFn: () => getSingle(evolutionChainUrl),
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
