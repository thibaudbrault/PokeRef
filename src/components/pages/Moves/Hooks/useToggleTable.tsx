import { getMoves, getStats, getStatus } from '@/utils/DataFetch';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useQueries } from '@tanstack/react-query';

const MovesTable = dynamic(
  () => import(`@/components/pages/Moves/Components/MovesTable.Moves`),
);
const StatusTable = dynamic(
  () => import(`@/components/pages/Moves/Components/StatusTable.Moves`),
);
const StatsTable = dynamic(() => import(`../Components/StatsTable.Moves`));

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
      return <MovesTable moves={moves.data} />;
    } else if (toggle === 2) {
      return <StatusTable status={status.data} />;
    } else if (toggle === 3) {
      return <StatsTable stats={stats.data} />;
    }
  };

  return { moves, status, stats, toggle, setToggle, pageShown };
};
