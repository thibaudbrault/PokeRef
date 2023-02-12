import { LeftTitle } from '@/components/common/styles/Headings';
import { GenNav } from '@/components/common/styles/Navbars';
import { MainBig } from '@/components/common/styles/Sizing';
import {
  FullWidthTable,
  TableContainer,
  TLink,
  TBold,
} from '@/components/common/styles/Table';
import Loader from '@/components/common/ui/Loader/Loader';
import { useTableParams } from '@/hooks/useTableParams';
import { IMachine } from '@/types/Machines/Machine';
import { getMachines } from '@/utils/DataFetch';
import { ColumnDef } from '@tanstack/react-table';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { removeDash } from '@/utils/Typography';

const NavMachines = dynamic(
  () => import(`@/components/pages/Machines/Components/Nav.Machines`),
);

type Props = {
  initialMachines: IMachine[];
};

function MachinesPage({ initialMachines }: Props) {
  const [version, setVersion] = useState<string>(`red-blue`);
  const {
    isLoading,
    error,
    data: machines,
  } = useQuery({
    queryKey: [`machines`],
    queryFn: getMachines,
    // initialData: initialMachines,
  });

  const data = useMemo(
    () => machines?.filter((m) => m.version_group.name === version),
    [version, machines],
  );

  const columns = useMemo<ColumnDef<IMachine>[]>(
    () => [
      {
        accessorKey: `item.name`,
        id: `sort`,
        header: `Name`,
        cell: (info) => <TBold>{info.getValue<string>().toUpperCase()}</TBold>,
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
              {removeDash(info.getValue<string>())}
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
          <FullWidthTable>
            {tableHeader()}
            {tableBody()}
          </FullWidthTable>
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
