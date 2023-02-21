import { IMove } from '@/types/Moves/Move';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { IType } from '@/types/Pokemon/Type';
import { getType, getTypeMoves, getTypePokemon } from '@/utils/DataFetch';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const MovesType = dynamic(() => import(`../Moves/Moves.TypeCard`));
const PokemonType = dynamic(() => import(`../Pokemon/Pokemon.TypeCard`));

export const useToggleTable = (name: string) => {
  const {
    isLoading,
    isError,
    error,
    data: type,
  }: UseQueryResult<IType, Error> = useQuery({
    queryKey: [`type`, name],
    queryFn: () => getType(`https://pokeapi.co/api/v2/type/${name}`),
  });

  const { data: pokemon }: UseQueryResult<IPokemon[]> = useQuery({
    queryKey: ['typePokemon'],
    queryFn: () => type && getTypePokemon(type),
    enabled: !!type,
  });

  const { data: moves }: UseQueryResult<IMove[]> = useQuery({
    queryKey: ['typeMoves'],
    queryFn: () => type && getTypeMoves(type),
    enabled: !!type,
  });

  const [toggle, setToggle] = useState(1);
  const pageShown = () => {
    if (toggle === 1) {
      return <PokemonType typeName={type?.name} pokemon={pokemon} />;
    } else if (toggle === 2 && type) {
      return <MovesType type={type} moves={moves} />;
    }
  };

  return { type, isLoading, isError, error, toggle, setToggle, pageShown };
};
