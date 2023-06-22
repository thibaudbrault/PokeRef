import { getMoves, getStats, getStatus } from '@/utils/DataFetch';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { Moves, Stats, Status } from '../components';

export const useToggleTable = () => {
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

  const [toggle, setToggle] = useState(1);
  const pageShown = () => {
    if (toggle === 1) {
      return <Moves moves={moves.data} />;
    } else if (toggle === 2) {
      return <Status status={status.data} />;
    } else if (toggle === 3) {
      return <Stats stats={stats.data} />;
    }
  };

  return { moves, status, stats, toggle, setToggle, pageShown };
};
