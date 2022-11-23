import React, { Key } from 'react';

import {
  ModifiedTable,
  TableContainer,
  THead,
  TName,
  TRow,
} from '../../Common/Table';
import { ModifiedLeftTitle, MovesSection, StatusMoves } from '../StyledMoves';
import Link from 'next/link';
import { Sort } from '@/types/types';

type Props = {
  status: any[];
  toggleState: number;
};

type Status = {
  id: number;
  name: string;
  moves: any[];
};

function StatusTable({ status, toggleState }: Props) {
  return (
    <MovesSection visibility={toggleState === 2}>
      <ModifiedLeftTitle>Status</ModifiedLeftTitle>
      <TableContainer>
        <ModifiedTable>
          <THead>
            <tr>
              <th>Status</th>
              <th>Moves</th>
            </tr>
          </THead>
          <tbody>
            {status
              ?.filter((s: Status) => s.name !== `none`)
              ?.sort(({ a, b }: Sort) => a.name.localeCompare(b.name))
              ?.map((s: Status) => (
                <TRow key={s.id}>
                  <TName>{s.name.replace(/-/g, ` `)}</TName>
                  <StatusMoves>
                    {s.moves.map((sm: Status) => (
                      <Link
                        href={{
                          pathname: `/move/[name]`,
                          query: { name: sm.name },
                        }}
                        key={sm.name}
                        passHref
                      >
                        <a>{sm.name.replace(/-/g, ` `)}</a>
                      </Link>
                    ))}
                  </StatusMoves>
                </TRow>
              ))}
          </tbody>
        </ModifiedTable>
      </TableContainer>
    </MovesSection>
  );
}

export default StatusTable;
