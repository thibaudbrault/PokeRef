import { getMoves, getStats, getStatus } from '@/utils';
import { useQueries } from '@tanstack/react-query';

export const useMovesQuery = () => {
  const [moves, status, stats] = useQueries({
    queries: [
      {
        queryKey: [`moves`],
        queryFn: getMoves,
      },
      {
        queryKey: [`status`],
        queryFn: getStatus,
      },
      {
        queryKey: [`stats`],
        queryFn: getStats,
      },
    ],
  });

  return { moves, status, stats };
};
