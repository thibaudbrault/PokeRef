import { useState } from 'react';
import { useMoves, useStatus } from '@/hooks/DataFetch';
import dynamic from 'next/dynamic';

const MovesTable = dynamic(
  () => import(`@/components/pages/Moves/Components/MovesTable.Moves`),
);
const StatusTable = dynamic(
  () => import(`@/components/pages/Moves/Components/StatusTable.Moves`),
);

export const useToggleTable = () => {
  const { isLoading, error, data: moves } = useMoves();
  const { data: status } = useStatus();

  const [toggle, setToggle] = useState(1);
  const pageShown = () => {
    if (toggle === 1) {
      return <MovesTable moves={moves} />;
    } else if (toggle === 2) {
      return <StatusTable status={status} />;
    }
  };

  return { isLoading, error, toggle, setToggle, pageShown };
};
