import { useQueries, useQuery } from '@tanstack/react-query';

import {
  BASE_URL,
  QueryKeys,
  getCards,
  getPokemonTypes,
  getSingle,
} from '@/utils';

export const useFetchPokemon = (name: string) => {
  const cards: any[] = [];
  // const [pokemon, location, cards] = useQueries({
  const [pokemon, location] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.POKEMON.INDEX, name],
        queryFn: () => getSingle(`${BASE_URL}/pokemon/${name}`),
      },
      {
        queryKey: [QueryKeys.ENCOUNTER.INDEX, name],
        queryFn: () => getSingle(`${BASE_URL}/pokemon/${name}/encounters`),
      },
      // {
      //   queryKey: [QueryKeys.CARDS, name],
      //   queryFn: () => getCards(name),
      // },
    ],
  });

  const types = useQuery({
    queryKey: [QueryKeys.TYPES, name, pokemon.data],
    queryFn: () => getPokemonTypes(pokemon.data),
    enabled: !!pokemon.data && pokemon.data.id < 10000,
  });

  const species = useQuery({
    queryKey: [QueryKeys.SPECIES, name, pokemon.data],
    queryFn: () => getSingle(`${BASE_URL}/pokemon-species/${pokemon.data.id}`),
    enabled: !!pokemon.data && pokemon.data.id < 10000,
  });

  const evolutionChainUrl = species.data?.evolution_chain?.url;

  const evolution = useQuery({
    queryKey: [QueryKeys.EVOLUTION, name, evolutionChainUrl],
    queryFn: () => {
      if (!evolutionChainUrl)
        return Promise.reject(
          new Error('Evolution chain URL is not available'),
        );
      return getSingle(evolutionChainUrl);
    },
    enabled: !!evolutionChainUrl,
  });

  const pokemonId = pokemon.data?.id || null;

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
