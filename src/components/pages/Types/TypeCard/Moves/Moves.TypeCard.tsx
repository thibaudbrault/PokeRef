import React from 'react';
import { H3, Span } from '../../../../CommonStyles/Headings';
import { Section } from '../../../../CommonStyles/Sizing';
import { TableContainer, THead, TRow } from '../../../../CommonStyles/Table';
import {
  TypeListSubtitle,
  TypeMovesTable,
  TypeMovesComment,
  TypeMovesData,
  TypeMovesName,
} from '../Styled.TypeCard';
import Link from 'next/link';
import { Moves, Types } from '@/types/types';

type Props = {
  type: Types.Types;
  moves: Moves.Moves[];
};

function Moves({ type, moves }: Props) {
  // Returns the number of moves from this type
  const nbMoves = document.querySelectorAll(`.moveElement`).length;

  return (
    <Section>
      <H3>Moves</H3>
      <TypeListSubtitle>
        {nbMoves} moves are <Span>{type.name}</Span> type
      </TypeListSubtitle>
      <TableContainer>
        <TypeMovesTable>
          <THead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Power</th>
              <th>PP</th>
              <th>Accuracy</th>
              <th>Status</th>
            </tr>
          </THead>
          <tbody className="type_container_table_body">
            {type?.moves
              ?.sort((a, b) => a.name.localeCompare(b.name))
              ?.map((tm) =>
                moves?.map(
                  (m) =>
                    m.name === tm.name && (
                      <TRow key={tm.name} className="moveElement">
                        <TypeMovesName>
                          <Link
                            href={{
                              pathname: `/move/[name]`,
                              query: { name: m.name },
                            }}
                            key={m.name}
                          >
                            {tm.name.replace(/-/g, ` `)}
                          </Link>
                        </TypeMovesName>
                        <TypeMovesData>{m?.damage_class?.name}</TypeMovesData>
                        <TypeMovesData>
                          {m?.power !== null ? m?.power : `-`}
                        </TypeMovesData>
                        <TypeMovesData>{m?.pp}</TypeMovesData>
                        <TypeMovesData>
                          {m?.accuracy !== null ? m?.accuracy : `-`}
                        </TypeMovesData>
                        <TypeMovesData>
                          {m?.meta?.ailment?.name !== `none`
                            ? m?.meta?.ailment?.name
                            : `-`}
                        </TypeMovesData>
                      </TRow>
                    ),
                ),
              )}
          </tbody>
        </TypeMovesTable>
      </TableContainer>
      {type?.name !== `fairy` && (
        <TypeMovesComment>
          <Span>{type.name}</Span> attacks were{` `}
          <Span>{type?.move_damage_class?.name}</Span> before Gen IV
        </TypeMovesComment>
      )}
    </Section>
  );
}

export default Moves;
