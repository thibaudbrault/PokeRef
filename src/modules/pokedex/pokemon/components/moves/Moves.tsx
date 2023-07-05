import { useTableParams } from '@/hooks';
import { IMoveAilment, IPokemon } from '@/types';
import { LearnMethod, removeDash, uppercase } from '@/utils';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { IMoveWithDetails, useFetchMachines, useFetchMoves } from '../../hooks';
import styles from './Moves.module.scss';
import { SmallLoader } from '@/components';

type Props = {
  pokemon: IPokemon;
  version: string;
  name: string;
};

export function Moves({ pokemon, version, name }: Props) {
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

  const getFirstCellValue = (info: CellContext<IMoveWithDetails, unknown>) => {
    if (learn === `level-up`) {
      if (info.getValue<number>() > 0) {
        return info.getValue<number>();
      } else if (info.getValue<number>() > 0) {
        return `Evolution`;
      }
    }
    if (learn === `machine`) {
      if (machines && machines?.length) {
        return uppercase(machines[info.row.index].item.name);
      } else if (!machines?.length) {
        return `Machine`;
      }
    } else {
      return `-`;
    }
  };

  const [data, setData] = useState<IMoveWithDetails[]>([]);

  useEffect(() => {
    if (pokemonMoves) {
      setData(pokemonMoves);
    }
  }, [pokemonMoves]);

  const columns = useMemo<ColumnDef<IMoveWithDetails>[]>(
    () => [
      {
        accessorFn: (row) => {
          if (learn === `level-up`) {
            return row.version_group_details[0].level_learned_at;
          }
        },
        id: learn === `level-up` || learn === `machine` ? `sort` : `level`,
        header: learnHeader(),
        cell: (info) => <td>{getFirstCellValue(info)}</td>,
      },
      {
        accessorKey: `move.name`,
        id: `name`,
        header: `Name`,
        cell: (info) => (
          <td className="tBold">
            <Link
              className="tLink"
              href={{
                pathname: `/move/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {removeDash(info.getValue<string>())}
            </Link>
          </td>
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
                src={`/images/types/${info.getValue<string>()}.png`}
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
        cell: (info) => (
          <td className="tCapitalize">{info.getValue<string>()}</td>
        ),
      },
      {
        accessorKey: `details.power`,
        id: `power`,
        header: `Power`,
        cell: (info) => (
          <td className="tCapitalize">{info.getValue<string>() || `-`}</td>
        ),
      },
      {
        accessorKey: `details.pp`,
        id: `pp`,
        header: `PP`,
        cell: (info) => (
          <td className="tCapitalize">{info.getValue<string>()}</td>
        ),
      },
      {
        accessorKey: `details.accuracy`,
        id: `accuracy`,
        header: `Accuracy`,
        cell: (info) => (
          <td className="tCapitalize">{info.getValue<string>() || `-`}</td>
        ),
      },
      {
        accessorKey: `details.priority`,
        id: `priority`,
        header: `Priority`,
        cell: (info) => (
          <td className="tCapitalize">{info.getValue<string>()}</td>
        ),
      },
      {
        accessorKey: `details.meta.ailment`,
        id: `status`,
        header: `Status`,
        cell: (info) => (
          <td className="tCapitalize">
            {info.getValue()
              ? removeDash(info?.getValue<IMoveAilment>().name).replace(
                  `none`,
                  `-`,
                )
              : `-`}
          </td>
        ),
      },
    ],

    //eslint-disable-next-line react-hooks/exhaustive-deps
    [learn, version],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  if (isError) {
    return (
      <>
        {toast.error(`Something went wrong: ${error?.message}`, {
          style: {
            fontSize: `1.7rem`,
          },
        })}
      </>
    );
  }

  if (isLoading) {
    return <SmallLoader />;
  }

  return (
    <section className={styles.section} id="moves">
      <h3 className="h3">Moves</h3>
      <LearnMethod toggle={toggle} setToggle={setToggle} setLearn={setLearn} />
      <div className="tableContainer" ref={tableContainerRef}>
        <table className="fullWidthTable">
          {tableHeader()}
          {tableBody()}
          <tfoot>
            <tr>
              <td colSpan={9}>There is no move learned this way</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
