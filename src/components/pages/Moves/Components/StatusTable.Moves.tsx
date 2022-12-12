import React from 'react';

import {
  ModifiedTable,
  TableContainer,
  THead,
  TName,
  TRow,
} from '../../CommonStyles/Table';
import { ModifiedLeftTitle, MovesSection, StatusMoves } from '../Styled.Moves';
import Link from 'next/link';
import { Moves } from '@/types/types';

type Props = {
  status: Moves.Status[];
  toggleState: number;
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
              .filter((s) => s.name !== `none`)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((s: Moves.Status) => (
                <TRow key={s.id}>
                  <TName>{s.name.replace(/-/g, ` `)}</TName>
                  <StatusMoves>
                    {s.moves.map((sm) => (
                      <Link
                        href={{
                          pathname: `/move/[name]`,
                          query: { name: sm.name },
                        }}
                        key={sm.name}
                      >
                        {sm.name.replace(/-/g, ` `)}
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
