import { useQueries } from '@tanstack/react-query';

import { QueryKeys, getMultiple } from '@/utils';

export const useItemsQuery = () => {
  const [items, berries] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.ITEMS],
        queryFn: () => getMultiple(`https://pokeapi.co/api/v2/item?limit=2051`),
      },
      {
        queryKey: [QueryKeys.ITEMS],
        queryFn: () => getMultiple(`https://pokeapi.co/api/v2/berry?limit=66`),
      },
    ],
  });

  return { items, berries };
};
