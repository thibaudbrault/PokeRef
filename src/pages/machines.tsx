import React, { useMemo, useState } from 'react';
import { GenNav } from '@/components/common/styles/Navbars';
import { LeftTitle } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import { MachinesTable } from '@/components/pages/Machines/Styled.Machines';
import Loader from '@/components/common/ui/Loader/Loader';
import dynamic from 'next/dynamic';
import TableHead from '@/components/common/ui/TableHead';
import { useQuery } from 'react-query';
import { getMachines } from '@/utils/DataFetch';
import { useTableParams } from '@/hooks/useTableParams';
import { TName, TLink, TEffect } from '@/components/common/styles/Table';

const ListMachines = dynamic(
  () => import(`@/components/pages/Machines/Components/List.Machines`),
);
const NavMachines = dynamic(
  () => import(`@/components/pages/Machines/Components/Nav.Machines`),
);

function MachinesPage({ initialMachines }) {
  const [version, setVersion] = useState(`red-blue`);
  const { isLoading, error, data: machines } = useQuery({
    queryKey: ['machines'],
    queryFn: getMachines,
    initialData: initialMachines
  });

  const data = useMemo(() => machines, [machines])

  const columns = useMemo(
    () => [
      {
        accessorKey: "item.name",
        header: "Name",
        cell: info =>
          <TName>
            {info.getValue<string>().toUpperCase()}
          </TName>
      },
      {
        accessorKey: "move.name",
        header: "Move",
        cell: info =>
          <td>
            <TLink
              href={{
                pathname: `/move/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {info.getValue<string>().replace(/-/g, ` `)}
            </TLink>
          </td>
      },
    ],
    []
  )

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(data, columns)

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
        <GenNav>
          <NavMachines setVersion={setVersion} />
        </GenNav>
        <MachinesTable ref={tableContainerRef}>
          {tableHeader()}
          {tableBody()}
        </MachinesTable>
      </MainBig>
    </>
  );
}

export default MachinesPage;

export async function getServerSideProps() {
  const initialMachines = await getMachines()
  return {
    props: {
      initialMachines
    }
  }
}