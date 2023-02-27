import { IMachine } from '@/types/Machines/Machine';
import { getMove, getMoveMachines, getPokedex } from '@/utils/DataFetch';
import { useQueries, useQuery, UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';

export const useFetchMove = (name: string) => {
  const [move, pokedex] = useQueries({
    queries: [
      {
        queryKey: [`move`, name],
        queryFn: () => getMove(name),
      },
      {
        queryKey: [`pokedex`],
        queryFn: () =>
          getPokedex(`https://pokeapi.co/api/v2/pokemon?limit=1008`),
      },
    ],
  });

  const { data: machine }: UseQueryResult<IMachine[]> = useQuery({
    queryKey: [`machine`],
    queryFn: () => getMoveMachines(move.data),
    enabled: !!move.data,
  });

  // Version of the returned data is from the latest available from PokéAPI
  const [version, setVersion] = useState(`sword-shield`);

  // Switch between the different tables for the method to learn the move
  const [toggle, setToggle] = useState(0);

  return {
    move,
    pokedex,
    machine,
    version,
    setVersion,
    toggle,
    setToggle,
  };
};
