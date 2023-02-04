import React, { useEffect, useMemo, useState } from 'react';
import {
  PokemonMovesSection,
  PokemonMovesTd,
  PokemonMovesMachine,
  PokemonMovesTable,
} from './Styled.Moves.PokemonCard';
import {
  THead,
  TRow,
  TLink,
  TableContainer,
} from '@/components/common/styles/Table';
import { H3, Span } from '@/components/common/styles/Headings';
import { Type } from '@/components/common/styles/Themes';
import { LearnMethod } from '@/utils/ObjectsMap';
import Link from 'next/link';
import Image from 'next/image';
import { Machines, Moves, Pokemon } from '@/types/types';
import { IPokemon, IPokemonMoveVersion } from '@/types/Pokemon/Pokemon';
import { ColumnDef } from '@tanstack/react-table';
import { IMove } from '@/types/Moves/Move';
import { useTableParams } from '@/hooks/useTableParams';
import { IMoveAilment } from '@/types/Moves/MoveAilment';
import axios from 'axios';
import { useQuery } from 'react-query';

type Props = {
  pokemon: IPokemon;
  moves: IMove[];
  machines: Machines.Machines[];
  version: string;
};

function MovesPokemon({ pokemon, moves, machines, version }: Props) {
  // Changes according to the table selected
  const [learn, setLearn] = useState<string>(`level-up`);
  const [toggle, setToggle] = useState<number>(0);
  const [pokemonMoves, setPokemonMoves] = useState([]);

  console.log(pokemon.moves);

  async function getPokemonMoves() {
    try {
      const promiseRes = await Promise.all(
        pokemon.moves.map((pm) =>
          pm.version_group_details.map(
            (pmv) =>
              pmv.version_group.name === version &&
              pmv.move_learn_method.name === learn &&
              axios.get(pm.move.url),
          ),
        ),
      );
      const result = promiseRes.map((res) => res.data);
      setPokemonMoves(result);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getPokemonMoves();
  }, []);

  console.log(pokemonMoves);

  const data = useMemo(() => pokemonMoves, [pokemonMoves]);

  const columns = useMemo<ColumnDef<IMove>[]>(
    () => [
      // {
      //   accessorKey: "",
      //   id: 'sort',
      //   header: learn === 'level-up' ? 'Level' : learn === 'machine' ? 'Machine' : '-',
      //   cell: info =>
      // },
      // {
      //   accessorKey: "",
      //   id: "name",
      //   header: "Name",
      //   cell: info =>
      // },
      {
        accessorKey: `type.name`,
        id: `type`,
        header: `Type`,
        cell: (info) => (
          <PokemonMovesTd>
            <Link
              href={{
                pathname: `/type/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              <Image
                src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${info.getValue<string>()}.png`}
                alt={info.getValue<string>()}
                width={32}
                height={32}
                style={{ cursor: `pointer` }}
              />
            </Link>
          </PokemonMovesTd>
        ),
      },
      {
        accessorKey: `damage_class.name`,
        id: `category`,
        header: `Category`,
        cell: (info) => (
          <PokemonMovesTd>{info.getValue<string>()}</PokemonMovesTd>
        ),
      },
      {
        accessorKey: `power`,
        id: `power`,
        header: `Power`,
        cell: (info) => (
          <PokemonMovesTd>{info.getValue<string>() || `-`}</PokemonMovesTd>
        ),
      },
      {
        accessorKey: `pp`,
        id: `pp`,
        header: `PP`,
        cell: (info) => (
          <PokemonMovesTd>{info.getValue<string>()}</PokemonMovesTd>
        ),
      },
      {
        accessorKey: `accuracy`,
        id: `accuracy`,
        header: `Accuracy`,
        cell: (info) => (
          <PokemonMovesTd>{info.getValue<string>() || `-`}</PokemonMovesTd>
        ),
      },
      {
        accessorKey: `priority`,
        id: `priority`,
        header: `Priority`,
        cell: (info) => (
          <PokemonMovesTd>{info.getValue<string>()}</PokemonMovesTd>
        ),
      },
      {
        accessorKey: `meta.ailment`,
        id: `status`,
        header: `Status`,
        cell: (info) => (
          <PokemonMovesTd>
            {info.getValue()
              ? info
                  ?.getValue<IMoveAilment>()
                  .name.replace(`none`, `-`)
                  .replace(/-/g, ` `)
              : `-`}
          </PokemonMovesTd>
        ),
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  const isLearnedMoveForVersion =
    (version: string) => (pmv: IPokemonMoveVersion) =>
      pmv.version_group.name === version &&
      pmv.move_learn_method.name === learn;

  const isLearnedMove = isLearnedMoveForVersion(version);

  const moveInfoTable = (pm: Pokemon.Moves) =>
    moves?.map(
      (m) =>
        m.name === pm.move.name && (
          <>
            <PokemonMovesTd>
              <Type id={m.type.name} style={{ background: `transparent` }}>
                <Link
                  href={{
                    pathname: `/type/[name]`,
                    query: { name: m.type.name },
                  }}
                >
                  <Image
                    src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${m.type.name}.png`}
                    alt={m.type.name}
                    width={32}
                    height={32}
                    style={{ cursor: `pointer` }}
                  />
                </Link>
              </Type>
            </PokemonMovesTd>
            <PokemonMovesTd>{m.damage_class.name}</PokemonMovesTd>
            <PokemonMovesTd>{m.power !== null ? m.power : `-`}</PokemonMovesTd>
            <PokemonMovesTd>{m.pp}</PokemonMovesTd>
            <PokemonMovesTd>
              {m.accuracy !== null ? m.accuracy : `-`}
            </PokemonMovesTd>
            <PokemonMovesTd>{m.priority}</PokemonMovesTd>
            <PokemonMovesTd>
              {m.meta.ailment !== null
                ? m.meta.ailment.name.replace(`none`, `-`).replace(/-/g, ` `)
                : `-`}
            </PokemonMovesTd>
          </>
        ),
    );

  const dataMoves = pokemon.moves?.map((pm: Pokemon.Moves) =>
    pm.version_group_details?.map(
      (pmv) =>
        isLearnedMove(pmv) && (
          <TRow key={pmv.level_learned_at}>
            {(() => {
              if (learn === `level-up` && pmv.level_learned_at === 0) {
                return (
                  <PokemonMovesTd>
                    <Span>evolution</Span>
                  </PokemonMovesTd>
                );
              } else if (learn === `level-up` && pmv.level_learned_at !== 0) {
                return <td>{pmv.level_learned_at}</td>;
              }
            })()}
            {learn === `machine` &&
              machines?.map(
                (ma: Machines.Machines) =>
                  ma.move.name === pm.move.name &&
                  ma.version_group.name === version && (
                    <PokemonMovesMachine key={ma.item.name}>
                      {ma.item.name}
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
                {pm.move.name.replace(/-/g, ` `)}
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
      <LearnMethod toggle={toggle} setToggle={setToggle} setLearn={setLearn} />
      <TableContainer ref={tableContainerRef}>
        <PokemonMovesTable>
          {tableHeader()}
          {tableBody()}
          <span>There is no move learned this way</span>
        </PokemonMovesTable>
      </TableContainer>
    </PokemonMovesSection>
  );
}

export default MovesPokemon;
