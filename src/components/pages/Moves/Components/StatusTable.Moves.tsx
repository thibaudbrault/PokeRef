import { useMemo } from 'react';

import { LeftTitle } from '@/components/common/styles/Headings';
import {
  FullWidthTable,
  TableContainer,
  TBold,
} from '@/components/common/styles/Table';
import { useTableParams } from '@/hooks/useTableParams';
import { IMove } from '@/types/Moves/Move';
import { IMoveAilment } from '@/types/Moves/MoveAilment';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { StatusMoves } from '../Styled.Moves';
import { removeDash } from '@/utils/Typography';

type Props = {
  status?: IMoveAilment[];
};

function StatusTable({ status }: Props) {
  const data = useMemo(
    () => status?.filter((s) => s.name !== `none`),
    [status],
  );

  const columns = useMemo<ColumnDef<IMoveAilment>[]>(
    () => [
      {
        accessorKey: `name`,
        id: `sort`,
        header: `Status`,
        cell: (info) => <TBold>{removeDash(info.getValue<string>())}</TBold>,
      },
      {
        accessorFn: (row) => row.moves,
        header: `Moves`,
        cell: (info) => (
          <StatusMoves>
            {info.getValue<IMove[]>().map((i) => (
              <Link
                href={{
                  pathname: `/move/[name]`,
                  query: { name: i.name },
                }}
              >
                <p>{removeDash(i.name)}</p>
              </Link>
            ))}
          </StatusMoves>
        ),
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  return (
    <>
      <LeftTitle>Status</LeftTitle>
      <TableContainer ref={tableContainerRef}>
        <FullWidthTable>
          {tableHeader()}
          {tableBody()}
        </FullWidthTable>
      </TableContainer>
    </>
  );
}

export default StatusTable;
