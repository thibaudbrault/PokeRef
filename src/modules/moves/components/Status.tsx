import { useMemo } from 'react';

import { LeftH2 } from '@/components/common/styles/Headings';
import {
  FullWidthTable,
  TableContainer,
  TBold,
} from '@/components/common/styles/Table';
import { useTableParams } from '@/hooks/useTableParams';
import { IMove, IMoveAilment } from '@/types';
import { removeDash } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { StatusMoves } from '../Styled.Moves';

type Props = {
  status?: IMoveAilment[];
};

export function Status({ status }: Props) {
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
                key={i.id}
                href={{
                  pathname: `/move/[name]`,
                  query: { name: i.name },
                }}
              >
                {removeDash(i.name)}
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
      <LeftH2>Status</LeftH2>
      <TableContainer ref={tableContainerRef}>
        <FullWidthTable>
          {tableHeader()}
          {tableBody()}
        </FullWidthTable>
      </TableContainer>
    </>
  );
}
