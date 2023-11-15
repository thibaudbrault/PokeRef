import { useQueries } from '@tanstack/react-query';

import { BASE_URL, QueryKeys, getMultiple } from '@/utils';

export const useItemsQuery = () => {
  const [items, berries] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.ITEMS],
        queryFn: () => getMultiple(`${BASE_URL}/item?limit=2051`),
      },
      {
        queryKey: [QueryKeys.ITEMS],
        queryFn: () => getMultiple(`${BASE_URL}/berry?limit=66`),
      },
    ],
  });

  return { items, berries };
};
