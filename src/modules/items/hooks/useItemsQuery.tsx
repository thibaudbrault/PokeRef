import { useQueries } from '@tanstack/react-query';

import itemsJson from '@/data/items.json';
import {
  BASE_URL,
  Limit,
  QueryKeys,
  getLocalMultiple,
  getMultiple,
} from '@/utils';

export const useItemsQuery = () => {
  const [items, berries] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.ITEMS],
        queryFn: () => getLocalMultiple(itemsJson),
      },
      {
        queryKey: [QueryKeys.BERRIES],
        queryFn: () => getMultiple(`${BASE_URL}/berry?limit=${Limit.BERRIES}`),
      },
    ],
  });

  return { items, berries };
};
