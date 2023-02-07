import React, { useMemo } from 'react';

import {
  ModifiedTable,
  TableContainer,
  TName,
} from '@/components/common/styles/Table';
import { ModifiedLeftTitle, MovesSection, StatusMoves } from '../Styled.Moves';
import { Moves } from '@/types/types';
import { useTableParams } from '@/hooks/useTableParams';
import { ColumnDef } from '@tanstack/react-table';
import { IMoveAilment } from '@/types/Moves/MoveAilment';
import Link from 'next/link';

type Props = {
  status?: IMoveAilment[];
};

function StatusTable({ status }: Props) {
  const data = useMemo(() => status, [status]);

  const columns = useMemo<ColumnDef<IMoveAilment>[]>(
    () => [
      {
        accessorKey: `name`,
        id: `sort`,
        header: `Status`,
        cell: (info) => (
          <TName>{info.getValue<string>().replace(/-/g, ` `)}</TName>
        ),
      },
      {
        accessorFn: (row) =>
          row.moves.map((m) => {
            return m.name;
          }),
        header: `Moves`,
        cell: (info) => (
          <StatusMoves>
            <Link
              href={{
                pathname: `/move/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              <p>{info.getValue<string>()}</p>
            </Link>
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
    <MovesSection>
      <ModifiedLeftTitle>Status</ModifiedLeftTitle>
      <TableContainer ref={tableContainerRef}>
        <ModifiedTable>
          {tableHeader()}
          {tableBody()}
        </ModifiedTable>
      </TableContainer>
    </MovesSection>
  );
}

export default StatusTable;
