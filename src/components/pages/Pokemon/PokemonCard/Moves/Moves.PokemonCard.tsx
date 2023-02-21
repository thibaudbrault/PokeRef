import { H3 } from '@/components/common/styles/Headings';
import { TableContainer, TBold } from '@/components/common/styles/Table';
import { useTableParams } from '@/hooks/useTableParams';
import { IMachine } from '@/types/Machines/Machine';
import { IMove } from '@/types/Moves/Move';
import { IPokemon, IPokemonMove } from '@/types/Pokemon/Pokemon';
import { LearnMethod } from '@/utils/ObjectsMap';
import { removeDash } from '@/utils/Typography';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { useMemo, useState } from 'react';
import {
  PokemonMovesSection,
  PokemonMovesTable,
} from './Styled.Moves.PokemonCard';

type Props = {
  pokemon: IPokemon;
  moves?: IMove[];
  machines?: IMachine[];
  version: string;
  game: string;
};

function MovesPokemon({ pokemon, moves, machines, version }: Props) {
  // Changes according to the table selected
  const [learn, setLearn] = useState<string>(`level-up`);
  const [toggle, setToggle] = useState<number>(0);

  const learnHeader = () => {
    if (learn === 'level-up') {
      return 'Level';
    } else if (learn === 'machine') {
      return 'Machine';
    }
    return '-';
  };

  const filteredMoves = pokemon.moves
    .map((m) => {
      const version_group_details = m.version_group_details.filter(
        (mv) =>
          mv.version_group.name === version &&
          mv.move_learn_method.name === learn,
      );
      return {
        ...m,
        version_group_details,
      };
    })
    .filter((m) => m.version_group_details.length);

  const data = useMemo(() => filteredMoves, [pokemon, version, learn]);

  const columns = useMemo<ColumnDef<IPokemonMove>[]>(
    () => [
      {
        accessorFn: (row) => row.version_group_details[0].level_learned_at,
        id: 'sort',
        header: `${learnHeader()}`,
        cell: (info) => <td>{info.getValue<number>()}</td>,
      },
      {
        accessorKey: 'move.name',
        id: 'name',
        header: 'Name',
        cell: (info) => <TBold>{removeDash(info.getValue<string>())}</TBold>,
      },
      // {
      //   accessorKey: `type.name`,
      //   id: `type`,
      //   header: `Type`,
      //   cell: (info) => (
      //     <PokemonMovesTd>
      //       <Link
      //         href={{
      //           pathname: `/type/[name]`,
      //           query: { name: info.getValue<string>() },
      //         }}
      //       >
      //         <Image
      //           src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${info.getValue<string>()}.png`}
      //           alt={info.getValue<string>()}
      //           width={32}
      //           height={32}
      //           style={{ cursor: `pointer` }}
      //         />
      //       </Link>
      //     </PokemonMovesTd>
      //   ),
      // },
      // {
      //   accessorKey: `damage_class.name`,
      //   id: `category`,
      //   header: `Category`,
      //   cell: (info) => (
      //     <PokemonMovesTd>{info.getValue<string>()}</PokemonMovesTd>
      //   ),
      // },
      // {
      //   accessorKey: `power`,
      //   id: `power`,
      //   header: `Power`,
      //   cell: (info) => (
      //     <PokemonMovesTd>{info.getValue<string>() || `-`}</PokemonMovesTd>
      //   ),
      // },
      // {
      //   accessorKey: `pp`,
      //   id: `pp`,
      //   header: `PP`,
      //   cell: (info) => (
      //     <PokemonMovesTd>{info.getValue<string>()}</PokemonMovesTd>
      //   ),
      // },
      // {
      //   accessorKey: `accuracy`,
      //   id: `accuracy`,
      //   header: `Accuracy`,
      //   cell: (info) => (
      //     <PokemonMovesTd>{info.getValue<string>() || `-`}</PokemonMovesTd>
      //   ),
      // },
      // {
      //   accessorKey: `priority`,
      //   id: `priority`,
      //   header: `Priority`,
      //   cell: (info) => (
      //     <PokemonMovesTd>{info.getValue<string>()}</PokemonMovesTd>
      //   ),
      // },
      // {
      //   accessorKey: `meta.ailment`,
      //   id: `status`,
      //   header: `Status`,
      //   cell: (info) => (
      //     <PokemonMovesTd>
      //       {info.getValue()
      //         ? removeDash(info?.getValue<IMoveAilment>().name).replace(
      //           `none`,
      //           `-`,
      //         )
      //         : `-`}
      //     </PokemonMovesTd>
      //   ),
      // },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  return (
    <PokemonMovesSection>
      <H3>Moves</H3>
      <LearnMethod toggle={toggle} setToggle={setToggle} setLearn={setLearn} />
      <TableContainer ref={tableContainerRef}>
        <PokemonMovesTable>
          {tableHeader()}
          {tableBody()}
        </PokemonMovesTable>
      </TableContainer>
    </PokemonMovesSection>
  );
}

export default MovesPokemon;
