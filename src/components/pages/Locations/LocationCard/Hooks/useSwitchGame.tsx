import { ILocation } from '@/types/Locations/Location';
import { ILocationArea } from '@/types/Locations/LocationArea';
import { getArea, getLocation } from '@/utils/DataFetch';
import { useEffect, useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useSwitchGame = (name: string) => {
  const [game, setGame] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);
  const [toggleState, setToggleState] = useState<number>(0);

  const toggleTable = (index: number) => {
    setToggleState(index);
  };

  const { data: location } = useQuery<ILocation>({
    queryKey: [`location`],
    queryFn: () => getLocation(name),
  });

  const areaUrl = location?.areas[toggleState]?.url;

  const {
    isLoading,
    isError,
    error,
    data: area,
  }: UseQueryResult<ILocationArea, Error> = useQuery({
    queryKey: [`area`],
    queryFn: () => getArea(areaUrl),
    enabled: !!areaUrl,
  });

  const gameUsed = () => {
    switch (location?.region.name) {
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
  }, [location?.region.name]);

  return {
    game,
    setGame,
    version,
    setVersion,
    isLoading,
    isError,
    error,
    toggleState,
    toggleTable,
    location,
    area,
  };
};
