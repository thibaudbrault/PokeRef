import { IMachine } from '@/types/Machines/Machine';
import { IMove } from '@/types/Moves/Move';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { getMove, getMoveMachines, getMovePokemon } from '@/utils/DataFetch';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';

export const useFetchMove = (name: string) => {
  const {
    isLoading,
    isError,
    error,
    data: move,
  }: UseQueryResult<IMove, Error> = useQuery({
    queryKey: [`move`, name],
    queryFn: () => getMove(name),
  });

  const { status, data: pokemon }: UseQueryResult<IPokemon[]> = useQuery({
    queryKey: [`pokemonMove`, name, move],
    queryFn: () => move && getMovePokemon(move),
    enabled: !!move,
  });

  const { data: machine }: UseQueryResult<IMachine[]> = useQuery({
    queryKey: [`machine`, name, move],
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
