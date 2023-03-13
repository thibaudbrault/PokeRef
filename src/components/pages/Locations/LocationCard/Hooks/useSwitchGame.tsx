import { ILocation } from '@/types/Locations/Location';
import { ILocationArea } from '@/types/Locations/LocationArea';
import {
  getArea,
  getEncounterCondition,
  getEncounterMethod,
  getLocation,
} from '@/utils/DataFetch';
import { useQueries, useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useSwitchGame = (name: string) => {
  const [game, setGame] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);
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
        queryKey: [`encounterCondition`],
        queryFn: getEncounterCondition,
      },
      {
        queryKey: [`encounterMethod`],
        queryFn: getEncounterMethod,
      },
    ],
  });

  const gameUsed = () => {
    switch (location.data?.region.name) {
      case `kanto`:
        setGame(`yellow`);
        break;
      case `johto`:
        setGame(`crystal`);
        break;
      case `hoenn`:
        setGame(`emerald`);
        break;
      case `sinnoh`:
        setGame(`platinum`);
        break;
      case `unova`:
        setGame(`black-2`);
        break;
      case `kalos`:
        setGame(`x`);
        break;
      case `alola`:
        setGame(`ultra-sun`);
        break;
    }
  };

  useEffect(() => {
    gameUsed();
  }, [location.data?.region.name]);

  const {
    isLoading,
    isError,
    error,
    data: area,
  }: UseQueryResult<ILocationArea, Error> = useQuery({
    queryKey: [`area`, toggleState, game, name],
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
