import { useState, useEffect } from 'react';
import { useLocations } from '@/hooks/DataFetch';
import { regions } from '@/utils/DataArrays';

export const useToggleLocation = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [toggle, setToggle] = useState<number>(0);
  const { isLoading, error, data: locations } = useLocations();

  useEffect(() => {
    setLocation(regions[toggle + 1]);
  }, [toggle]);

  return { isLoading, error, locations, toggle, setToggle, location };
};
