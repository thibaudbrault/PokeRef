import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import {
  BASE_URL,
  getMoveMachines,
  getMovePokemon,
  getSingle,
  QueryKeys,
} from '@/utils';

import type { IMachine, IMove, IPokemon } from '@/types';

export const useFetchMove = (name: string) => {
  const {
    isLoading,
    isError,
    error,
    data: move,
  }: UseQueryResult<IMove, Error> = useQuery({
    queryKey: [QueryKeys.MOVE.INDEX, name],
    queryFn: () => getSingle(`${BASE_URL}/move/${name}`),
  });

  const { status, data: pokemon }: UseQueryResult<IPokemon[]> = useQuery({
    queryKey: [QueryKeys.MOVE.POKEMON, name, move],
    queryFn: () => move && getMovePokemon(move),
    enabled: !!move,
  });

  const { data: machine }: UseQueryResult<IMachine[]> = useQuery({
    queryKey: [QueryKeys.MACHINE, name, move],
    queryFn: () => move && getMoveMachines(move),
    enabled: !!move,
  });

  return {
    move,
    isLoading,
    isError,
    error,
    pokemon,
    status,
    machine,
  };
};
