import { useEffect, useState } from 'react';

import { useQueries, useQuery, UseQueryResult } from '@tanstack/react-query';

import { BASE_URL, getMultiple, getSingle, Limit, QueryKeys } from '@/utils';

import type {
  IEncounterConditionValue,
  IEncounterMethod,
  ILocation,
} from '@/types';

export const useSwitchGame = (name: string) => {
  const [game, setGame] = useState<string>(``);

  const locationQuery: UseQueryResult<ILocation, Error> = useQuery({
    queryKey: [QueryKeys.LOCATION, name],
    queryFn: () => getSingle(`${BASE_URL}/location/${name}`),
  });
  const encounterQuery: UseQueryResult<IEncounterConditionValue[], Error> =
    useQuery({
      queryKey: [QueryKeys.ENCOUNTER.CONDITION, name],
      queryFn: () =>
        getMultiple(
          `${BASE_URL}/encounter-condition-value?limit=${Limit.ENCOUNTER.CONDITION}`,
        ),
    });

  const methodQuery: UseQueryResult<IEncounterMethod[], Error> = useQuery({
    queryKey: [QueryKeys.ENCOUNTER.METHOD, name],
    queryFn: () =>
      getMultiple(
        `${BASE_URL}/encounter-method?limit=${Limit.ENCOUNTER.METHOD}`,
      ),
  });

  const areaQuery = useQueries({
    queries: locationQuery.data
      ? locationQuery.data?.areas.map((area) => {
          return {
            queryKey: [QueryKeys.AREA, area.url],
            queryFn: () => getSingle(area.url),
            enabled: !!locationQuery.data.areas,
          };
        })
      : [],
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
      areaQuery.some((area) => area.isLoading),
    isError:
      locationQuery.isError ||
      encounterQuery.isError ||
      methodQuery.isError ||
      areaQuery.some((area) => area.isError),
    error:
      locationQuery.error ||
      encounterQuery.error ||
      methodQuery.error ||
      areaQuery.some((area) => area.error),
    location: locationQuery.data,
    areas: areaQuery.map((area) => area.data),
    encounter: encounterQuery.data,
    method: methodQuery.data,
  };
};
