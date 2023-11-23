import { useQueries } from '@tanstack/react-query';

import { BASE_URL, Limit, QueryKeys, getMultiple } from '@/utils';

export const useItemsQuery = () => {
  const [items, berries] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.ITEMS],
        queryFn: () => getMultiple(`${BASE_URL}/item?limit=${Limit.ITEMS}`),
      },
      {
        queryKey: [QueryKeys.BERRIES],
        queryFn: () => getMultiple(`${BASE_URL}/berry?limit=${Limit.BERRIES}`),
      },
    ],
  });

  return { items, berries };
};
