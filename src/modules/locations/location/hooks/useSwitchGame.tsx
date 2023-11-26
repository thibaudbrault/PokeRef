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
  const [toggle, setToggle] = useState<number>(0);

  const locationQuery = useQuery<ILocation, Error>({
    queryKey: [QueryKeys.LOCATION, toggle, name],
    queryFn: () => getSingle(`${BASE_URL}/location/${name}`),
  });

  const encounterQuery = useQuery({
    queryKey: [QueryKeys.ENCOUNTER.CONDITION, name],
    queryFn: () =>
      getMultiple(
        `${BASE_URL}/encounter-condition-value?limit=${Limit.ENCOUNTER.CONDITION}`,
      ),
  });

  const methodQuery = useQuery({
    queryKey: [QueryKeys.ENCOUNTER.METHOD, name],
    queryFn: () =>
      getMultiple(
        `${BASE_URL}/encounter-method?limit=${Limit.ENCOUNTER.METHOD}`,
      ),
  });

  const areaQuery: UseQueryResult<ILocationArea, Error> = useQuery({
    queryKey: [
      QueryKeys.AREA,
      toggle,
      game,
      name,
      locationQuery.data?.areas[toggle]?.url,
    ],
    queryFn: () =>
      locationQuery.data?.areas[toggle]?.url &&
      getSingle(locationQuery.data?.areas[toggle]?.url),
    enabled:
      !!locationQuery.data?.areas[toggle]?.url &&
      !!game &&
      !!encounterQuery.data,
  });

  const gameUsed = () => {
    const regionName = locationQuery.data?.region.name || ``;
    switch (regionName) {
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
  }, [locationQuery.data?.region.name]);

  return {
    game,
    setGame,
    isLoading:
      locationQuery.isLoading ||
      encounterQuery.isLoading ||
      methodQuery.isLoading ||
      areaQuery.isLoading,
    isError:
      locationQuery.isError ||
      encounterQuery.isError ||
      methodQuery.isError ||
      areaQuery.isError,
    error:
      locationQuery.error ||
      encounterQuery.error ||
      methodQuery.error ||
      areaQuery.error,
    toggle,
    setToggle,
    location: locationQuery.data,
    area: areaQuery.data,
    encounter: encounterQuery.data,
    method: methodQuery.data,
  };
};
