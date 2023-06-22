import {
  Bold,
  LeftH2,
  LeftSubtitle,
} from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import {
  FullWidthTable,
  TableContainer,
  TBold,
  TLink,
} from '@/components/common/styles/Table';
import Loader from '@/components/common/ui/Loader/Loader';
import { useTableParams } from '@/hooks/useTableParams';
import { Heading } from '@/modules/machines';
import { IMachine } from '@/types/Machines/Machine';
import { getMachines } from '@/utils/DataFetch';
import { removeDash, uppercase } from '@/utils/Typography';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const Nav = dynamic(() => import(`@/components/common/ui/GenNav`));

function MachinesPage() {
  const [version, setVersion] = useState<string | null>(`red-blue`);
  const [game, setGame] = useState<string | null>(`red`);
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
        cell: (info) => <TBold>{uppercase(info.getValue<string>())}</TBold>,
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
    return toast.error(`Something went wrong: ${error.message}`, {
      style: {
        fontSize: `1.7rem`,
      },
    });
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading />
      <MainBig>
        <LeftH2>Machines</LeftH2>
        <LeftSubtitle>
          Game selected: <Bold>{game}</Bold>
        </LeftSubtitle>
        <Nav setGame={setGame} setVersion={setVersion} />
        <TableContainer ref={tableContainerRef}>
          <FullWidthTable>
            {tableHeader()}
            {tableBody()}
            <tfoot>
              <tr>
                <td colSpan={2}>There is no data for this game</td>
              </tr>
            </tfoot>
          </FullWidthTable>
        </TableContainer>
      </MainBig>
    </>
  );
}

export default MachinesPage;
