import { useState } from 'react';
import { useMachines, useMove, usePokedex } from '@/hooks/DataFetch';

export const useFetchMove = (name: string | string[] | undefined) => {
  const {
    isLoading,
    error,
    data: move,
  } = useMove(`https://pokeapi.co/api/v2/move/${name}`);

  const { data: pokedex } = usePokedex(
    `https://pokeapi.co/api/v2/pokemon?limit=905`,
  );

  const { data: machines } = useMachines();

  // Version of the returned data is from the latest available from PokéAPI
  const [version, setVersion] = useState(`ultra-sun-ultra-moon`);

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
