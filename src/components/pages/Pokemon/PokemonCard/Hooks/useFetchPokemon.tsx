import { IPokemon } from '@/types/Pokemon/Pokemon';
import {
  getEvolution,
  getPokemon,
  getPokemonLocation,
  getSpecies,
  getTypes,
} from '@/utils/DataFetch';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const useFetchPokemon = (name: string) => {
  const [pokemonId, setPokemonId] = useState<number | null>(null);

  const [pokemon, types, location] = useQueries({
    queries: [
      {
        queryKey: [`pokemon`, name],
        queryFn: () => getPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`),
        onSuccess: (data: IPokemon) => {
          setPokemonId(data.id);
        },
      },
      {
        queryKey: [`types`, name],
        queryFn: getTypes,
      },
      {
        queryKey: [`encounter`, name],
        queryFn: () =>
          getPokemonLocation(
            `https://pokeapi.co/api/v2/pokemon/${name}/encounters`,
          ),
      },
    ],
  });

  const species = useQuery({
    queryKey: [`species`, name],
    queryFn: () =>
      getSpecies(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon.data.id}`,
      ),
    enabled: !!pokemon.data && pokemon.data.id < 10000,
  });

  const evolutionChainUrl = species.data?.evolution_chain?.url;

  const evolution = useQuery({
    queryKey: [`evolution`, name],
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
  };
};
