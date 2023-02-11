import { getMove, getPokedex, useMachines } from '@/utils/DataFetch';
import { useState } from 'react';
import { useQuery } from 'react-query';

export const useFetchMove = (name: string) => {
  const {
    isLoading,
    error,
    data: move,
  } = useQuery({
    queryKey: [`move`],
    queryFn: () => getMove(name),
  });

  const { data: pokedex } = useQuery({
    queryKey: [`pokedex`],
    queryFn: () => getPokedex(`https://pokeapi.co/api/v2/pokemon?limit=905`),
  });

  const { data: machines } = useMachines();

  // Version of the returned data is from the latest available from PokéAPI
  const [version, setVersion] = useState(`sword-shield`);

  // Switch between the different tables for the method to learn the move
  const [toggle, setToggle] = useState(0);

  return {
    isLoading,
    error,
    move,
    pokedex,
    machines,
    version,
    setVersion,
    toggle,
    setToggle,
  };
};
