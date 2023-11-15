import { useState } from 'react';

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

  // Version of the returned data is from the latest available from PokéAPI
  const [version, setVersion] = useState(`sword-shield`);

  // Switch between the different tables for the method to learn the move
  const [toggle, setToggle] = useState(0);

  return {
    move,
    isLoading,
    isError,
    error,
    pokemon,
    status,
    machine,
    version,
    setVersion,
    toggle,
    setToggle,
  };
};
