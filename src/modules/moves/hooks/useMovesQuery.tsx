import { useState } from 'react';

import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';

import { IMove } from '@/types';
import { BASE_URL, Limit, QueryKeys, getMultiple } from '@/utils';

export const useMovesQuery = () => {
  const limit = 50;
  const [offset, setOffset] = useState(0);

  const { data: moves, status: movesStatus } = useQuery<IMove[], Error>({
    queryKey: [QueryKeys.MOVES, limit, offset],
    queryFn: () =>
      getMultiple(`${BASE_URL}/move?limit=${limit}&offset=${offset}`),
    placeholderData: keepPreviousData,
  });

  const [status, stats] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.STATUS],
        queryFn: () =>
          getMultiple(`${BASE_URL}/move-ailment?limit=${Limit.MOVES.AILMENT}`),
      },
      {
        queryKey: [QueryKeys.STATS],
        queryFn: () => getMultiple(`${BASE_URL}/stat`),
      },
    ],
  });

  return {
    setOffset,
    moves,
    movesStatus,
    status,
    stats,
  };
};
