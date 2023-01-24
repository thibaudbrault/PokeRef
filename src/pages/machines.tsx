import React from 'react';
import { GenNav } from '@/components/common/styles/Navbars';
import { LeftTitle } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import { MachinesTable } from '@/components/pages/Machines/Styled.Machines';
import Loader from '@/components/common/ui/Loader/Loader';
import ModifiedSearchUi from '@/components/common/ui/ModifiedSearch.ui';
import { useFilterMachines } from '@/components/pages/Machines/Hooks/useFilterMachines';
import dynamic from 'next/dynamic';
import TableHead from '@/components/common/ui/TableHead';

const ListMachines = dynamic(
  () => import(`@/components/pages/Machines/Components/List.Machines`),
);
const NavMachines = dynamic(
  () => import(`@/components/pages/Machines/Components/Nav.Machines`),
);

function MachinesPage() {
  const { setSearch, version, setVersion, isLoading, error, filterMachines } =
    useFilterMachines();

  const tableHead: string[] = [`Name`, `Moves`];

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <MainBig>
        <LeftTitle>Machines</LeftTitle>
        <ModifiedSearchUi placeholder="Move Name" setSearch={setSearch} />
        <GenNav>
          <NavMachines setVersion={setVersion} />
        </GenNav>
        <MachinesTable>
          <TableHead array={tableHead} />
          <ListMachines filterMachines={filterMachines} version={version} />
        </MachinesTable>
      </MainBig>
    </>
  );
}

export default MachinesPage;
