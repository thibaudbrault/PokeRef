import { useEffect, useState } from 'react';

import {
  useQueries,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query';

import {
  getArea,
  getEncounterCondition,
  getEncounterMethod,
  getLocation,
} from '@/utils';

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
        queryKey: [`location`, toggleState, name],
        queryFn: () => getLocation(name),
        onSuccess: (data: ILocation) => {
          setAreaUrl(data.areas[toggleState]?.url);
        },
      },
      {
        queryKey: [`encounterCondition`, name],
        queryFn: getEncounterCondition,
      },
      {
        queryKey: [`encounterMethod`, name],
        queryFn: getEncounterMethod,
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
    queryKey: [`area`, toggleState, game, name, areaUrl],
    queryFn: () => areaUrl && getArea(areaUrl),
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
