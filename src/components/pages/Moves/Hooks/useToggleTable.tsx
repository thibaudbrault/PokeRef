import { useState } from 'react';
import { getMoves, getStatus } from '@/utils/DataFetch';
import dynamic from 'next/dynamic';
import { useQueries } from 'react-query';

const MovesTable = dynamic(
  () => import(`@/components/pages/Moves/Components/MovesTable.Moves`),
);
const StatusTable = dynamic(
  () => import(`@/components/pages/Moves/Components/StatusTable.Moves`),
);

export const useToggleTable = () => {
  const results = useQueries([
    {
      queryKey: [`moves`, 1],
      queryFn: getMoves,
      useErrorBoundary: true,
    },
    {
      queryKey: [`status`, 2],
      queryFn: getStatus,
    },
  ]);

  const [toggle, setToggle] = useState(1);
  const pageShown = () => {
    if (toggle === 1) {
      return <MovesTable moves={results[0].data} />;
    } else if (toggle === 2) {
      return <StatusTable status={results[1].data} />;
    }
  };

  return { results, toggle, setToggle, pageShown };
};
