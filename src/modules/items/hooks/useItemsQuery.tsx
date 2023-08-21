import { useQueries } from '@tanstack/react-query';

import { getMultiple } from '@/utils';

export const useItemsQuery = () => {
  const [items, berries] = useQueries({
    queries: [
      {
        queryKey: [`items`],
        queryFn: () => getMultiple(`https://pokeapi.co/api/v2/item?limit=2051`),
      },
      {
        queryKey: [`berries`],
        queryFn: () => getMultiple(`https://pokeapi.co/api/v2/berry?limit=66`),
      },
    ],
  });

  return { items, berries };
};
