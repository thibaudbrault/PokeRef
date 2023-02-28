import { ILocation } from '@/types/Locations/Location';
import { ILocationArea } from '@/types/Locations/LocationArea';
import { getArea, getLocation } from '@/utils/DataFetch';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useSwitchGame = (name: string) => {
  const [game, setGame] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);
  const [toggleState, setToggleState] = useState<number>(0);
  const [areaUrl, setAreaUrl] = useState<string | null>(null);

  const toggleTable = (index: number) => {
    setToggleState(index);
  };

  const { data: location }: UseQueryResult<ILocation> = useQuery<ILocation>({
    queryKey: [`location`, toggleState],
    queryFn: () => getLocation(name),
    onSuccess: (data) => {
      setAreaUrl(data.areas[toggleState]?.url);
    },
  });

  const {
    isLoading,
    isError,
    error,
    data: area,
  }: UseQueryResult<ILocationArea, Error> = useQuery({
    queryKey: [`area`, toggleState],
    queryFn: () => areaUrl && getArea(areaUrl),
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
