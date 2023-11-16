import { useEffect, useState } from 'react';

import {
  useQueries,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query';

import { BASE_URL, getMultiple, getSingle, Limit, QueryKeys } from '@/utils';

import type { ILocation, ILocationArea } from '@/types';

export const useSwitchGame = (name: string) => {
  const [game, setGame] = useState<string | null>(null);
  const [, setVersion] = useState<string | null>(null);
  const [toggleState, setToggleState] = useState<number>(0);
  const [areaUrl, setAreaUrl] = useState<string | null>(null);

  const toggleTable = (index: number) => {
    setToggleState(index);
  };

  const [location, encounter, method] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.LOCATION, toggleState, name],
        queryFn: () => getSingle(`${BASE_URL}/location/${name}`),
        onSuccess: (data: ILocation) => {
          setAreaUrl(data.areas[toggleState]?.url);
        },
      },
      {
        queryKey: [QueryKeys.ENCOUNTER.CONDITION, name],
        queryFn: () =>
          getMultiple(
            `${BASE_URL}/encounter-condition-value?limit=${Limit.ENCOUNTER.CONDITION}`,
          ),
      },
      {
        queryKey: [QueryKeys.ENCOUNTER.METHOD, name],
        queryFn: () =>
          getMultiple(
            `${BASE_URL}/encounter-method?limit=${Limit.ENCOUNTER.METHOD}`,
          ),
      },
    ],
  });

  const gameUsed = () => {
    switch (location.data?.region.name) {
      case `kanto`:
        setGame(`yellow`);
        return;
      case `johto`:
        setGame(`crystal`);
        return;
      case `hoenn`:
        setGame(`emerald`);
        return;
      case `sinnoh`:
        setGame(`platinum`);
        return;
      case `unova`:
        setGame(`black-2`);
        return;
      case `kalos`:
        setGame(`x`);
        return;
      case `alola`:
        setGame(`ultra-sun`);
        return;
      default:
        setGame(``);
        return;
    }
  };

  useEffect(() => {
    gameUsed();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.data?.region.name]);

  const {
    isLoading,
    isError,
    error,
    data: area,
  }: UseQueryResult<ILocationArea, Error> = useQuery({
    queryKey: [QueryKeys.AREA, toggleState, game, name, areaUrl],
    queryFn: () => areaUrl && getSingle(areaUrl),
    enabled: !!areaUrl && !!game && !!encounter.data,
  });

  return {
    game,
    setGame,
    setVersion,
    isLoading,
    isError,
    error,
    toggleState,
    toggleTable,
    location,
    area,
    encounter,
    method,
  };
};
