import { getBerries, getItems } from '@/utils/DataFetch';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { BerriesTable, ItemsTable } from '../Components';

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
      return <ItemsTable items={items.data} />;
    } else if (toggle === 2) {
      return <BerriesTable berries={berries.data} />;
    }
  };

  return { items, berries, toggle, setToggle, pageShown };
};
