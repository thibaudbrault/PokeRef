import { useQueries } from '@tanstack/react-query';

import { QueryKeys, getMultiple } from '@/utils';

export const useMovesQuery = () => {
  const [moves, status, stats] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.MOVES],
        queryFn: () => getMultiple(`https://pokeapi.co/api/v2/move?limit=919`),
      },
      {
        queryKey: [QueryKeys.STATUS],
        queryFn: () =>
          getMultiple(`https://pokeapi.co/api/v2/move-ailment?limit=22`),
      },
      {
        queryKey: [QueryKeys.STATS],
        queryFn: () => getMultiple(`https://pokeapi.co/api/v2/stat`),
      },
    ],
  });

  return { moves, status, stats };
};
