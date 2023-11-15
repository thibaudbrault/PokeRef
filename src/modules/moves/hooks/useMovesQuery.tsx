import { useQueries } from '@tanstack/react-query';

import { BASE_URL, QueryKeys, getMultiple } from '@/utils';

export const useMovesQuery = () => {
  const [moves, status, stats] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.MOVES],
        queryFn: () => getMultiple(`${BASE_URL}/move?limit=919`),
      },
      {
        queryKey: [QueryKeys.STATUS],
        queryFn: () => getMultiple(`${BASE_URL}/move-ailment?limit=22`),
      },
      {
        queryKey: [QueryKeys.STATS],
        queryFn: () => getMultiple(`${BASE_URL}/stat`),
      },
    ],
  });

  return { moves, status, stats };
};
