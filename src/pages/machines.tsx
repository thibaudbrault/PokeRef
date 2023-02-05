import React, { useEffect, useMemo, useState } from 'react';
import { GenNav } from '@/components/common/styles/Navbars';
import { LeftTitle } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import { MachinesTable } from '@/components/pages/Machines/Styled.Machines';
import Loader from '@/components/common/ui/Loader/Loader';
import dynamic from 'next/dynamic';
import { useQuery } from 'react-query';
import { getMachines } from '@/utils/DataFetch';
import { useTableParams } from '@/hooks/useTableParams';
import { TName, TLink, TableContainer, ModifiedTable } from '@/components/common/styles/Table';
import { ColumnDef } from '@tanstack/react-table';
import { IMachine } from '@/types/Machines/Machine';

const NavMachines = dynamic(
  () => import(`@/components/pages/Machines/Components/Nav.Machines`),
);

type Props = {
  initialMachines: IMachine[];
};

function MachinesPage({ initialMachines }: Props) {
  const [version, setVersion] = useState<string>(`red-blue`);
  const [test, setTest] = useState([])
  const {
    isLoading,
    error,
    data: machines,
  } = useQuery({
    queryKey: [`machines`],
    queryFn: getMachines,
    // initialData: initialMachines,
  });

  useEffect(() => {
    setTest(
      machines?.find((ma: IMachine) => {
        return ma.version_group.name === version
      })
    )
  }, [])

  console.log(test)

  const data = useMemo(() => {
    test
  }, [test]);

  const columns = useMemo<ColumnDef<IMachine>[]>(
    () => [
      {
        accessorKey: `item.name`,
        id: `sort`,
        header: `Name`,
        cell: (info) => <TName>{info.getValue<string>().toUpperCase()}</TName>,
      },
      {
        accessorKey: `move.name`,
        id: `move`,
        header: `Move`,
        cell: (info) => (
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
        ),
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

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
        <TableContainer ref={tableContainerRef}>
          <ModifiedTable>
            {tableHeader()}
            {tableBody()}
          </ModifiedTable>
        </TableContainer>
      </MainBig>
    </>
  );
}

export default MachinesPage;

// export async function getServerSideProps() {
//   const initialMachines = await getMachines();
//   return {
//     props: {
//       initialMachines,
//     },
//   };
// }
