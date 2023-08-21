import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { getSingle, getTypeMoves, getTypePokemon } from '@/utils';

import type { IMove, IPokemon, IType } from '@/types';

export const useTypeQuery = (name: string) => {
  const {
    isLoading,
    isError,
    error,
    data: type,
  }: UseQueryResult<IType, Error> = useQuery({
    queryKey: [`type`, name],
    queryFn: () => getSingle(`https://pokeapi.co/api/v2/type/${name}`),
  });

  const { data: pokemon }: UseQueryResult<IPokemon[]> = useQuery({
    queryKey: [`typePokemon`, name, type],
    queryFn: () => type && getTypePokemon(type),
    enabled: !!type,
  });

  const { data: moves }: UseQueryResult<IMove[]> = useQuery({
    queryKey: [`typeMoves`, name, type],
    queryFn: () => type && getTypeMoves(type),
    enabled: !!type,
  });

  return { type, pokemon, moves, isLoading, isError, error };
};
