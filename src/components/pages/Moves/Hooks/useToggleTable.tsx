import { getMoves, getStats, getStatus } from '@/utils/DataFetch';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import StatsTable from '../Components/StatsTable.Moves';

const MovesTable = dynamic(
  () => import(`@/components/pages/Moves/Components/MovesTable.Moves`),
);
const StatusTable = dynamic(
  () => import(`@/components/pages/Moves/Components/StatusTable.Moves`),
);

export const useToggleTable = () => {
  const results = useQueries({
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
        queryKey: ['stats'],
        queryFn: getStats,
      },
    ],
  });

  const [toggle, setToggle] = useState(1);
  const pageShown = () => {
    if (toggle === 1) {
      return <MovesTable moves={results[0].data} />;
    } else if (toggle === 2) {
      return <StatusTable status={results[1].data} />;
    } else if (toggle === 3) {
      return <StatsTable stats={results[2].data} />;
    }
  };

  return { results, toggle, setToggle, pageShown };
};
