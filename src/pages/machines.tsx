import React from 'react';
import { GenNav } from '@/components/common/styles/Navbars';
import { LeftTitle } from '@/components/common/styles/Headings';
import { THead } from '@/components/common/styles/Table';
import { MainBig } from '@/components/common/styles/Sizing';
import { MachinesTable } from '@/components/pages/Machines/Styled.Machines';
import Loader from '@/components/common/ui/Loader/Loader';
import ModifiedSearchUi from '@/components/common/ui/ModifiedSearch.ui';
import { useFilterMachines } from '@/components/pages/Machines/Hooks/useFilterMachines';
import dynamic from 'next/dynamic';

const ListMachines = dynamic(
  () => import(`@/components/pages/Machines/Components/List.Machines`),
);
const NavMachines = dynamic(
  () => import(`@/components/pages/Machines/Components/Nav.Machines`),
);

function MachinesPage() {
  const { setSearch, version, setVersion, isLoading, error, filterMachines } =
    useFilterMachines();

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
          <ol>
            <NavMachines setVersion={setVersion} />
          </ol>
        </GenNav>
        <MachinesTable>
          <THead>
            <tr>
              <th>Name</th>
              <th>Moves</th>
            </tr>
          </THead>
          <tbody>
            <ListMachines filterMachines={filterMachines} version={version} />
          </tbody>
        </MachinesTable>
      </MainBig>
    </>
  );
}

export default MachinesPage;
