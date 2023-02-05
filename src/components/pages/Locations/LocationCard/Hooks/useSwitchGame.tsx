import { useState, useEffect } from 'react';
import { getLocation, getArea } from '@/utils/DataFetch';
import { useQuery } from 'react-query';
import { ILocationArea } from '@/types/Locations/LocationArea';
import { ILocation } from '@/types/Locations/Location';

export const useSwitchGame = (name: string) => {
  const [game, setGame] = useState<string>(`red`);
  const [toggleState, setToggleState] = useState<number>(0);

  const toggleTable = (index: number) => {
    setToggleState(index);
  };

  const { data: location } = useQuery<ILocation>({
    queryKey: ['location'],
    queryFn: () => getLocation(name),
  })

  const areaUrl = location?.areas[toggleState]?.url;

  const { isLoading, error, data: area } = useQuery<ILocationArea>({
    queryKey: ['area'],
    queryFn: () => getArea(areaUrl),
    enabled: !!areaUrl
  })

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
    isLoading,
    error,
    toggleState,
    toggleTable,
    location,
    area,
  };
};
