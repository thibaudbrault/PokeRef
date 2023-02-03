import React, { useMemo } from 'react';

import {
  ModifiedTable,
  TableContainer,
  THead,
  TName,
  TRow,
} from '@/components/common/styles/Table';
import { ModifiedLeftTitle, MovesSection, StatusMoves } from '../Styled.Moves';
import Link from 'next/link';
import { Moves } from '@/types/types';
import { useTableParams } from '@/hooks/useTableParams';

type Props = {
  status?: Moves.Status[];
};

function StatusTable({ status }: Props) {

  const data = useMemo(() => status, [status]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Status",
        cell: info =>
          <TName>
            {info.getValue<string>().replace(/-/g, ` `)}
          </TName>
      },
      // {
      //   accessorKey: "damage_class.name",
      //   header: "Moves",
      //   cell: info =>
      //     <StatusMoves>
      //       {s.moves?.map((sm) => (
      //         <Link
      //           href={{
      //             pathname: `/move/[name]`,
      //             query: { name: info.getValue<string>() },
      //           }}
      //         >
      //           {info.getValue<string>().replace(/-/g, ` `)}
      //         </Link>
      //       ))}
      //     </StatusMoves>
      // },
    ],
    []
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(data, columns)

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
