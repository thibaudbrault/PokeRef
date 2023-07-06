import { IMove, IPokemon, IType } from '@/types';
import { getType, getTypeMoves, getTypePokemon } from '@/utils';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';
import { Moves, Pokemon } from '../components';

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
    queryKey: [`typePokemon`, name, type],
    queryFn: () => type && getTypePokemon(type),
    enabled: !!type,
  });

  const { data: moves }: UseQueryResult<IMove[]> = useQuery({
    queryKey: [`typeMoves`, name, type],
    queryFn: () => type && getTypeMoves(type),
    enabled: !!type,
  });

  const [toggle, setToggle] = useState(1);
  const pageShown = () => {
    if (toggle === 1) {
      return <Pokemon typeName={type?.name} pokemon={pokemon} />;
    } else if (toggle === 2 && type) {
      return <Moves type={type} moves={moves} />;
    }
  };

  return { type, isLoading, isError, error, toggle, setToggle, pageShown };
};
