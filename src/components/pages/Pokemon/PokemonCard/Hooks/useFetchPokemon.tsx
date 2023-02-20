import { IPokemon } from '@/types/Pokemon/Pokemon';
import {
  getEvolution,
  getMachines,
  getMoves,
  getPokemon,
  getPokemonLocation,
  getSpecies,
  getTypes,
} from '@/utils/DataFetch';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const useFetchPokemon = (name: string) => {
  const [pokemonId, setPokemonId] = useState<number | null>(null);
  const [game, setGame] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);

  const [pokemon, moves, types, machines, location] = useQueries({
    queries: [
      {
        queryKey: [`pokemon`, name],
        queryFn: () => getPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`),
        onSuccess: (data: IPokemon) => {
          setPokemonId(data.id);
        },
      },
      {
        queryKey: [`moves`, name],
        queryFn: getMoves,
      },
      {
        queryKey: [`types`, name],
        queryFn: getTypes,
      },
      {
        queryKey: [`machines`, name],
        queryFn: getMachines,
      },
      {
        queryKey: [`encounter`],
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
    game,
    setGame,
    version,
    setVersion,
    pokemon,
    species,
    moves,
    types,
    machines,
    location,
    evolution,
  };
};
