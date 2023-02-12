import { getMoves, getPokedex, getType } from '@/utils/DataFetch';
import { useQueries } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useState } from 'react';
const MovesType = dynamic(() => import(`../Moves/Moves.TypeCard`));
const PokemonType = dynamic(() => import(`../Pokemon/Pokemon.TypeCard`));

export const useToggleTable = (name: string) => {
  const results = useQueries({
    queries: [
      {
        queryKey: [`type`],
        queryFn: () => getType(`https://pokeapi.co/api/v2/type/${name}`),
      },
      {
        queryKey: [`pokedex`],
        queryFn: () =>
          getPokedex(`https://pokeapi.co/api/v2/pokemon?limit=1008`),
      },
      {
        queryKey: [`moves`],
        queryFn: getMoves,
      },
    ],
  });

  const [toggle, setToggle] = useState(1);
  const pageShown = () => {
    if (toggle === 1) {
      return <PokemonType type={results[0].data} pokedex={results[1].data} />;
    } else if (toggle === 2) {
      return <MovesType type={results[0].data} moves={results[2].data} />;
    }
  };

  return { results, toggle, setToggle, pageShown };
};
