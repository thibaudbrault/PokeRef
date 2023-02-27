import { getBerries, getItems } from '@/utils/DataFetch';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useQueries } from '@tanstack/react-query';

const ItemsTable = dynamic(
  () => import(`@/components/pages/Items/Components/ItemsTable.Items`),
);
const BerriesTable = dynamic(
  () => import(`@/components/pages/Items/Components/BerriesTable.Items`),
);

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
