import { H3 } from '@/components/common/styles/Headings';
import {
  FullWidthTable,
  TableContainer,
  TBold,
  TCapitalize,
  TLink,
} from '@/components/common/styles/Table';
import SmallLoader from '@/components/common/ui/Loader/SmallLoader';
import { useTableParams } from '@/hooks/useTableParams';
import { IMoveAilment } from '@/types/Moves/MoveAilment';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { LearnMethod } from '@/utils/ObjectsMap';
import { removeDash } from '@/utils/Typography';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useFetchMachines } from '../Hooks/useFetchMachines';
import { IMoveWithDetails, useFetchMoves } from '../Hooks/useFetchMoves';
import { PokemonMovesSection } from './Styled.Moves.PokemonCard';

type Props = {
  pokemon: IPokemon;
  version: string;
  name: string;
};

function MovesPokemon({ pokemon, version, name }: Props) {
  const [learn, setLearn] = useState<string>(`level-up`);
  const [toggle, setToggle] = useState<number>(0);

  const learnHeader = () => {
    if (learn === `level-up`) {
      return `Level`;
    } else if (learn === `machine`) {
      return `Machine`;
    }
    return `-`;
  };

  const { isLoading, isError, error, pokemonMoves } = useFetchMoves(
    pokemon,
    version,
    learn,
    name,
  );

  const { machines } = useFetchMachines(pokemon, version, name);

  // if (!machines) {
  //   console.log('No data')
  // } else if (machines) {
  //   console.log('Data')
  // }

  const [data, setData] = useState<IMoveWithDetails[]>([]);

  useEffect(() => {
    if (pokemonMoves) {
      setData(pokemonMoves);
    }
  }, [pokemonMoves]);

  const columns = useMemo<ColumnDef<IMoveWithDetails>[]>(
    () => [
      {
        accessorFn: (row) => row.version_group_details[0].level_learned_at,
        id: `sort`,
        header: `Level`,
        cell: (info) => {
          if (learn === `level-up` && info.getValue<number>() !== 0) {
            // console.log('first')
            return <td>{info.getValue<number>()}</td>;
          } else if (learn === `level-up` && info.getValue<number>() === 0) {
            // console.log('second')
            return <td>Evolution</td>;
          } else {
            // console.log('third')
            return <td>-</td>;
          }
          // return learn !== 'machine' && info.getValue<number>() > 0 ? (
          //   <td>
          //     {info.getValue<number>()}
          //   </td>
          // ) : learn === 'level-up' && info.getValue<number>() === 0 ? (
          //   <td>Evolution</td>
          // ) : (
          //   <td>-</td>
          // )
        },
      },
      {
        accessorKey: `move.name`,
        id: `name`,
        header: `Name`,
        cell: (info) => (
          <TBold>
            <TLink
              href={{
                pathname: `/move/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {removeDash(info.getValue<string>())}
            </TLink>
          </TBold>
        ),
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
    return toast.error(`Something went wrong: ${error?.message}`);
  }

  if (isLoading || !machines?.length) {
    return <SmallLoader />;
  }

  return (
    <PokemonMovesSection>
      <H3>Moves</H3>
      <LearnMethod toggle={toggle} setToggle={setToggle} setLearn={setLearn} />
      <TableContainer ref={tableContainerRef}>
        <FullWidthTable>
          {tableHeader()}
          {tableBody()}
          <tfoot>
            <tr>
              <td colSpan={9}>There is no move learned this way</td>
            </tr>
          </tfoot>
        </FullWidthTable>
      </TableContainer>
    </PokemonMovesSection>
  );
}

export default MovesPokemon;
