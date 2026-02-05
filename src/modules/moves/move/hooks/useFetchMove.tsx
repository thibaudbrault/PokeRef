import { useQuery } from '@tanstack/react-query';

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
  } = useQuery<IMove, Error>({
    queryKey: [QueryKeys.MOVE.INDEX, name],
    queryFn: () => getSingle(`${BASE_URL}/move/${name}`),
  });

  const { status, data: pokemon } = useQuery<IPokemon[], Error>({
    queryKey: [QueryKeys.MOVE.POKEMON, name, move],
    queryFn: () => {
      if (!move) return Promise.reject(new Error('Move is not available'));
      return getMovePokemon(move);
    },
    enabled: !!move,
  });

  const { data: machine } = useQuery<IMachine[], Error>({
    queryKey: [QueryKeys.MACHINE, name, move],
    queryFn: () => {
      if (!move) return Promise.reject(new Error('Move is not available'));
      return getMoveMachines(move);
    },
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
