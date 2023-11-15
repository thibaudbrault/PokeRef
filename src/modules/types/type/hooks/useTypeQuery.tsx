import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { getSingle, getTypeMoves, getTypePokemon, QueryKeys } from '@/utils';

import type { IMove, IPokemon, IType } from '@/types';

export const useTypeQuery = (name: string) => {
  const {
    isLoading,
    isError,
    error,
    data: type,
  }: UseQueryResult<IType, Error> = useQuery({
    queryKey: [QueryKeys.TYPE.INDEX, name],
    queryFn: () => getSingle(`https://pokeapi.co/api/v2/type/${name}`),
  });

  const { data: pokemon }: UseQueryResult<IPokemon[]> = useQuery({
    queryKey: [QueryKeys.TYPE.POKEMON, name, type],
    queryFn: () => type && getTypePokemon(type),
    enabled: !!type,
  });

  const { data: moves }: UseQueryResult<IMove[]> = useQuery({
    queryKey: [QueryKeys.TYPE.MOVES, name, type],
    queryFn: () => type && getTypeMoves(type),
    enabled: !!type,
  });

  return { type, pokemon, moves, isLoading, isError, error };
};
