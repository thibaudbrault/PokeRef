import { LeftTitle } from '@/components/common/styles/Headings';
import { GenNav } from '@/components/common/styles/Navbars';
import { MainBig } from '@/components/common/styles/Sizing';
import {
  FullWidthTable,
  TableContainer,
  TBold,
  TLink,
} from '@/components/common/styles/Table';
import Loader from '@/components/common/ui/Loader/Loader';
import { useTableParams } from '@/hooks/useTableParams';
import { IMachine } from '@/types/Machines/Machine';
import { getMachines } from '@/utils/DataFetch';
import { removeDash } from '@/utils/Typography';
import {
  dehydrate,
  QueryClient,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const NavMachines = dynamic(
  () => import(`@/components/pages/Machines/Components/Nav.Machines`),
);

function MachinesPage() {
  const [version, setVersion] = useState<string>(`red-blue`);
  const {
    isLoading,
    isError,
    error,
    data: machines,
  }: UseQueryResult<IMachine[], Error> = useQuery({
    queryKey: [`machines`],
    queryFn: getMachines,
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

  if (isError) {
    return toast.error(`Something went wrong: ${error.message}`);
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

export async function getStaticProps() {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: [`machines`],
    queryFn: getMachines,
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
