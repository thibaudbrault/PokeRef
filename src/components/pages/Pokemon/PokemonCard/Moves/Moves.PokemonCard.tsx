import { H3 } from '@/components/common/styles/Headings';
import {
  TableContainer,
  TBold,
  TCapitalize,
} from '@/components/common/styles/Table';
import SmallLoader from '@/components/common/ui/Loader/SmallLoader';
import { useTableParams } from '@/hooks/useTableParams';
import { IMachine } from '@/types/Machines/Machine';
import { IMove } from '@/types/Moves/Move';
import { IMoveAilment } from '@/types/Moves/MoveAilment';
import { IPokemon, IPokemonMove } from '@/types/Pokemon/Pokemon';
import { LearnMethod } from '@/utils/ObjectsMap';
import { removeDash } from '@/utils/Typography';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
  PokemonMovesSection,
  PokemonMovesTable,
} from './Styled.Moves.PokemonCard';

type Props = {
  pokemon: IPokemon;
  machines?: IMachine[];
  version: string;
  game: string;
};

interface IMoveWithDetails extends IPokemonMove {
  details: IMove;
}

function MovesPokemon({ pokemon, machines, version }: Props) {
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

  const filteredMovesWithDetails = async () => {
    const res = filteredMoves.map(async (m) => {
      const moveUrl = m.move.url;
      const details = await axios.get(moveUrl).then((res) => res.data);
      return {
        ...m,
        details,
      };
    });
    const results = await Promise.all(res);
    return results;
  };

  const {
    isLoading,
    isError,
    error,
    data: pokemonMoves,
  }: UseQueryResult<IMoveWithDetails, Error> = useQuery({
    queryKey: ['pokemonMoves', version, learn],
    queryFn: filteredMovesWithDetails,
  });

  const data = pokemonMoves;

  const columns = useMemo<ColumnDef<IMoveWithDetails>[]>(
    () => [
      {
        accessorFn: (row) => row.version_group_details[0].level_learned_at,
        id: 'sort',
        header: 'Level',
        cell: (info) => <td>{info.getValue<number>()}</td>,
      },
      {
        accessorKey: 'move.name',
        id: 'name',
        header: 'Name',
        cell: (info) => <TBold>{removeDash(info.getValue<string>())}</TBold>,
      },
      {
        accessorKey: `details.type.name`,
        id: `type`,
        header: `Type`,
        cell: (info) => (
          <td>
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
          </td>
        ),
      },
      {
        accessorKey: `details.damage_class.name`,
        id: `category`,
        header: `Category`,
        cell: (info) => <TCapitalize>{info.getValue<string>()}</TCapitalize>,
      },
      {
        accessorKey: `details.power`,
        id: `power`,
        header: `Power`,
        cell: (info) => (
          <TCapitalize>{info.getValue<string>() || `-`}</TCapitalize>
        ),
      },
      {
        accessorKey: `details.pp`,
        id: `pp`,
        header: `PP`,
        cell: (info) => <TCapitalize>{info.getValue<string>()}</TCapitalize>,
      },
      {
        accessorKey: `details.accuracy`,
        id: `accuracy`,
        header: `Accuracy`,
        cell: (info) => (
          <TCapitalize>{info.getValue<string>() || `-`}</TCapitalize>
        ),
      },
      {
        accessorKey: `details.priority`,
        id: `priority`,
        header: `Priority`,
        cell: (info) => <TCapitalize>{info.getValue<string>()}</TCapitalize>,
      },
      {
        accessorKey: `details.meta.ailment`,
        id: `status`,
        header: `Status`,
        cell: (info) => (
          <TCapitalize>
            {info.getValue()
              ? removeDash(info?.getValue<IMoveAilment>().name).replace(
                  `none`,
                  `-`,
                )
              : `-`}
          </TCapitalize>
        ),
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  if (isError) {
    return toast.error(`Something went wrong: ${error.message}`);
  }

  if (isLoading || !pokemonMoves) {
    return <SmallLoader />;
  }

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
