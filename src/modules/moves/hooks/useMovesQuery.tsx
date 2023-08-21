import { useQueries } from '@tanstack/react-query';

import { getMultiple } from '@/utils';

export const useMovesQuery = () => {
  const [moves, status, stats] = useQueries({
    queries: [
      {
        queryKey: [`moves`],
        queryFn: () => getMultiple(`https://pokeapi.co/api/v2/move?limit=919`),
      },
      {
        queryKey: [`status`],
        queryFn: () =>
          getMultiple(`https://pokeapi.co/api/v2/move-ailment?limit=22`),
      },
      {
        queryKey: [`stats`],
        queryFn: () => getMultiple(`https://pokeapi.co/api/v2/stat`),
      },
    ],
  });

  return { moves, status, stats };
};
