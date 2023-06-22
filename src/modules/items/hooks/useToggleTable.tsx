import { getBerries, getItems } from '@/utils';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { Berries, Items } from '../components';

export const useToggleTable = () => {
  const [items, berries] = useQueries({
    queries: [
      {
        queryKey: [`items`],
        queryFn: getItems,
      },
      {
        queryKey: [`berries`],
        queryFn: getBerries,
      },
    ],
  });

  const [toggle, setToggle] = useState(1);
  const pageShown = () => {
    if (toggle === 1) {
      return <Items items={items.data} />;
    } else if (toggle === 2) {
      return <Berries berries={berries.data} />;
    }
  };

  return { items, berries, toggle, setToggle, pageShown };
};
