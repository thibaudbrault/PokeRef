import { Capitalize, H3 } from '@/components/common/styles/Headings';
import { TableContainer, TLink, TRow } from '@/components/common/styles/Table';
import { Type } from '@/components/common/styles/Themes';
import { useTableParams } from '@/hooks/useTableParams';
import { IMachine } from '@/types/Machines/Machine';
import { IMove } from '@/types/Moves/Move';
import { IMoveAilment } from '@/types/Moves/MoveAilment';
import {
  IPokemon,
  IPokemonMove,
  IPokemonMoveVersion,
} from '@/types/Pokemon/Pokemon';
import { LearnMethod } from '@/utils/ObjectsMap';
import { removeDash } from '@/utils/Typography';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  PokemonMovesMachine,
  PokemonMovesSection,
  PokemonMovesTable,
  PokemonMovesTd,
} from './Styled.Moves.PokemonCard';

type Props = {
  pokemon: IPokemon;
  moves: IMove[];
  machines: IMachine[];
  version: string;
  game: string;
};

function MovesPokemon({ pokemon, moves, machines, version }: Props) {
  // Changes according to the table selected
  const [learn, setLearn] = useState<string>(`level-up`);
  const [toggle, setToggle] = useState<number>(0);
  const [pokemonMoves, setPokemonMoves] = useState<IMove[]>([]);

  // const filterArr = () => {
  //   return pokemon.moves.filter((pm) =>
  //     pm.version_group_details.map(
  //       (pmv) =>
  //         pmv.version_group.name === version &&
  //         pmv.move_learn_method.name === learn
  //     )
  //   )
  // }

  async function getPokemonMoves() {
    try {
      const res = pokemon.moves.map(pm => pm.move.url)
      const promiseRes = await Promise.all(
        res.map(res => axios.get(res))
      )
      setPokemonMoves(promiseRes.map(res => res.data))
    } catch (err) {
      console.error(err);
    }
  }

  // console.log(pokemonMoves)

  // console.log(pokemon.moves.map(pm => pm))

  // async function getPokemonMoves() {
  //   try {
  //     const promiseRes = await Promise.all(
  //       pokemon.moves.map((pm) =>
  //         pm.version_group_details.filter(
  //           (pmv) =>
  //             pmv.version_group.name === version &&
  //             pmv.move_learn_method.name === learn
  //         ),
  //       ),
  //     );
  //     console.log(promiseRes)
  //     const result = promiseRes.filter(p => p.length > 0).map((res) => res).flat();
  //     setPokemonMoves(result);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  useEffect(() => {
    getPokemonMoves();
  }, []);

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
              ? removeDash(info?.getValue<IMoveAilment>().name).replace(
                `none`,
                `-`,
              )
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

  const moveInfoTable = (pm: IPokemonMove) =>
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
                ? removeDash(m.meta.ailment.name).replace(`none`, `-`)
                : `-`}
            </PokemonMovesTd>
          </>
        ),
    );

  const dataMoves = pokemon.moves?.map((pm: IPokemonMove) =>
    pm.version_group_details?.map(
      (pmv) =>
        isLearnedMove(pmv) && (
          <TRow key={pmv.level_learned_at}>
            {(() => {
              if (learn === `level-up` && pmv.level_learned_at === 0) {
                return (
                  <PokemonMovesTd>
                    <Capitalize>evolution</Capitalize>
                  </PokemonMovesTd>
                );
              } else if (learn === `level-up` && pmv.level_learned_at !== 0) {
                return <td>{pmv.level_learned_at}</td>;
              }
            })()}
            {learn === `machine` &&
              machines?.map(
                (ma: IMachine) =>
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
                {removeDash(pm.move.name)}
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
      {/* <TableContainer ref={tableContainerRef}>
        <PokemonMovesTable>
          {tableHeader()}
          {tableBody()}
          <span>There is no move learned this way</span>
        </PokemonMovesTable>
      </TableContainer> */}
    </PokemonMovesSection>
  );
}

export default MovesPokemon;
