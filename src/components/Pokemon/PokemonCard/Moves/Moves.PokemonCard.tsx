import React, { useState, useEffect } from 'react';
import {
  PokemonMovesSection,
  PokemonMovesTd,
  PokemonMovesMachine,
  PokemonMovesTable,
} from './StyledMoves.PokemonCard';
import { THead, TRow, TLink, TableContainer } from '../../../Common/Table';
import { H3, Span } from '../../../Common/Headings';
import { Type } from '../../../Common/Themes';
import LearnMethod from '../../../../utils/LearnMethod';
import { learnMethod } from '../../../../utils/DataMap';
import Link from 'next/link';
import Image from 'next/image';
import { Machines, Moves, Pokemon, PokemonMoves } from '@/types/types';

type Props = {
  toggleState: number;
  toggleTable: () => void;
  pokemon: Pokemon;
  moves: Moves[];
  machines: Machines[];
  version: string;
};

function Moves({
  toggleState,
  toggleTable,
  pokemon,
  moves,
  machines,
  version,
}: Props) {
  // Changes according to the table selected
  const [learn, setLearn] = useState<string | null>(null);

  // Switch between tables and returns different moves according to the selected table
  useEffect(() => {
    setLearn(learnMethod[toggleState + 1]);
  }, [toggleState]);

  const isLearnedMoveForVersion =
    (version: string) => (pmv: PokemonMoves['version_group_details']) =>
      pmv?.version_group?.name === version &&
      pmv?.move_learn_method?.name === learn;

  const isLearnedMove = isLearnedMoveForVersion(version);

  const moveInfoTable = (pm: PokemonMoves) =>
    moves?.map(
      (m) =>
        m?.name === pm?.move?.name && (
          <>
            <PokemonMovesTd>
              <Type id={m?.type?.name} style={{ background: `transparent` }}>
                <Link
                  href={{
                    pathname: `/type/[name]`,
                    query: { name: m.type.name },
                  }}
                >
                  <Image
                    alt={m?.type?.name}
                    width={32}
                    height={32}
                    style={{ cursor: `pointer` }}
                  />
                </Link>
              </Type>
            </PokemonMovesTd>
            <PokemonMovesTd>{m?.damage_class?.name}</PokemonMovesTd>
            <PokemonMovesTd>
              {m?.power !== null ? m?.power : `-`}
            </PokemonMovesTd>
            <PokemonMovesTd>{m?.pp}</PokemonMovesTd>
            <PokemonMovesTd>
              {m?.accuracy !== null ? m?.accuracy : `-`}
            </PokemonMovesTd>
            <PokemonMovesTd>{m?.priority}</PokemonMovesTd>
            <PokemonMovesTd>
              {m?.meta?.ailment !== null
                ? m?.meta?.ailment?.name
                    ?.replace(`none`, `-`)
                    .replace(/-/g, ` `)
                : `-`}
            </PokemonMovesTd>
          </>
        ),
    );

  const dataMoves = pokemon?.moves?.map((pm: PokemonMoves) =>
    pm?.version_group_details?.map(
      (pmv: PokemonMoves['version_group_details']) =>
        isLearnedMove(pmv) && (
          <TRow key={pmv.level_learned_at}>
            {(() => {
              if (learn === `level-up` && pmv?.level_learned_at === 0) {
                return (
                  <PokemonMovesTd>
                    <Span>evolution</Span>
                  </PokemonMovesTd>
                );
              } else if (learn === `level-up` && pmv?.level_learned_at !== 0) {
                return <td>{pmv?.level_learned_at}</td>;
              }
            })()}
            {learn === `machine` &&
              machines?.map(
                (ma: Machines) =>
                  ma?.move?.name === pm?.move?.name &&
                  ma?.version_group?.name === version && (
                    <PokemonMovesMachine key={ma.item.name}>
                      {ma?.item?.name}
                    </PokemonMovesMachine>
                  ),
              )}
            {learn === `egg` && <td>-</td>}
            {learn === `tutor` && <td>-</td>}
            <td>
              <TLink
                href={{
                  pathname: `/move/[name]`,
                  query: { name: pm.move.name },
                }}
              >
                {pm?.move?.name.replace(/-/g, ` `)}
              </TLink>
            </td>
            {moveInfoTable(pm)}
          </TRow>
        ),
    ),
  );

  return (
    <PokemonMovesSection>
      <H3>Moves</H3>
      <LearnMethod toggleState={toggleState} toggleTable={toggleTable} />
      <TableContainer>
        <PokemonMovesTable>
          <THead>
            <tr>
              <th>
                {learn === `level-up`
                  ? `Level`
                  : learn === `machine`
                  ? `Machine`
                  : `-`}
              </th>
              <th>Name</th>
              <th>Type</th>
              <th>Category</th>
              <th>Power</th>
              <th>PP</th>
              <th>Accuracy</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </THead>
          <tbody>
            <>{dataMoves}</>
          </tbody>
          <span>There is no move learned this way</span>
        </PokemonMovesTable>
      </TableContainer>
    </PokemonMovesSection>
  );
}

export default Moves;
