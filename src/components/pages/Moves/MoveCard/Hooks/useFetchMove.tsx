import { getMachines, getMove, getPokedex } from '@/utils/DataFetch';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';

export const useFetchMove = (name: string) => {

  const results = useQueries({
    queries: [
      {
        queryKey: [`move`],
        queryFn: () => getMove(name),
      },
      {
        queryKey: [`pokedex`],
        queryFn: () => getPokedex(`https://pokeapi.co/api/v2/pokemon?limit=1008`),
      },
      {
        queryKey: ['machines'],
        queryFn: getMachines
      }
    ]
  })

  // Version of the returned data is from the latest available from PokéAPI
  const [version, setVersion] = useState(`sword-shield`);

  // Switch between the different tables for the method to learn the move
  const [toggle, setToggle] = useState(0);

  return {
    results,
    version,
    setVersion,
    toggle,
    setToggle,
  };
};
