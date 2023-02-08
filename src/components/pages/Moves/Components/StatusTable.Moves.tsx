import { useMemo } from 'react';

import {
  ModifiedTable,
  TableContainer,
  TName,
} from '@/components/common/styles/Table';
import { useTableParams } from '@/hooks/useTableParams';
import { IMove } from '@/types/Moves/Move';
import { IMoveAilment } from '@/types/Moves/MoveAilment';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { ModifiedLeftTitle, MovesSection, StatusMoves } from '../Styled.Moves';

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
        cell: (info) => (
          <TName>{info.getValue<string>().replace(/-/g, ` `)}</TName>
        ),
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
                <p>{i.name.replace(/-/g, ` `)}</p>
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
