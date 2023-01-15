import { useMachines } from '@/hooks/DataFetch';
import { Machines } from '@/types/types';
import { useState } from 'react';

export const useFilterMachines = () => {
  const [search, setSearch] = useState<string | null>(null);
  // Set default version for the list of returned machines to 'red-blue'
  const [version, setVersion] = useState(`red-blue`);
  const { isLoading, error, data: machines } = useMachines();

  // Filter the moves returned when the user type the name in the search bar
  const filterMachines: Machines.Machines[] = search
    ? machines
        ?.filter((machines: Machines.Machines) =>
          machines.move.name
            .replace(/-/g, ` `)
            .toLowerCase()
            .includes(search.toLowerCase()),
        )
        .find((ma) => ma.version_group.name === version)
    : machines;

  return {
    setSearch,
    version,
    setVersion,
    isLoading,
    error,
    filterMachines,
  };
};
