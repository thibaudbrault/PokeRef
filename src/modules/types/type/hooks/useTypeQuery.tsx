import { useQuery } from '@tanstack/react-query';

import {
  BASE_URL,
  getSingle,
  getTypeMoves,
  getTypePokemon,
  QueryKeys,
} from '@/utils';

import type { IMove, IPokemon, IType } from '@/types';

export const useTypeQuery = (name: string) => {
  const {
    isLoading: isTypeLoading,
    isError: isTypeError,
    error: typeError,
    data: type,
  } = useQuery<IType, Error>({
    queryKey: [QueryKeys.TYPE.INDEX, name],
    queryFn: () => getSingle(`${BASE_URL}/type/${name}`),
    enabled: !!name,
  });

  const {
    data: pokemon,
    isError: isPokemonError,
    error: pokemonError,
  } = useQuery<IPokemon[], Error>({
    queryKey: [QueryKeys.TYPE.POKEMON, name, type?.id],
    queryFn: () => {
      if (!type) return Promise.reject(new Error('Type is not available'));
      return getTypePokemon(type);
    },
    enabled: !!type,
  });

  const {
    data: moves,
    isError: isMovesError,
    error: movesError,
  } = useQuery<IMove[], Error>({
    queryKey: [QueryKeys.TYPE.MOVES, name, type?.id],
    queryFn: () => {
      if (!type) return Promise.reject(new Error('Type is not available'));
      return getTypeMoves(type);
    },
    enabled: !!type,
  });

  return {
    type,
    pokemon,
    moves,
    isLoading: isTypeLoading,
    isError: isTypeError || isPokemonError || isMovesError,
    error: typeError || pokemonError || movesError,
  };
};
