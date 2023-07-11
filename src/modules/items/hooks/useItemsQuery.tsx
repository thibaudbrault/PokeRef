import { useQueries } from '@tanstack/react-query';

import { getBerries, getItems } from '@/utils';

export const useItemsQuery = () => {
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

  return { items, berries };
};
