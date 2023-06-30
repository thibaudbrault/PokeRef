import { useTableParams } from '@/hooks';
import { IMoveStatAffect, INature, IStat } from '@/types';
import { removeDash } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useMemo } from 'react';
import styles from '../Moves.module.scss';

type Props = {
  stats?: IStat[];
};

export function Stats({ stats }: Props) {
  const data = useMemo(() => stats?.filter((s) => s.name !== `hp`), [stats]);

  const columns = useMemo<ColumnDef<IStat>[]>(
    () => [
      {
        header: `Stats`,
        columns: [
          {
            accessorKey: `name`,
            id: `sort`,
            cell: (info) => (
              <td className="tBold">{removeDash(info.getValue<string>())}</td>
            ),
          },
        ],
      },
      {
        header: `Moves`,
        columns: [
          {
            accessorKey: `affecting_moves.increase`,
            header: `Increase`,
            cell: (info) => (
              <td className={styles.stats}>
                {info.getValue<IMoveStatAffect[]>().map((i) => (
                  <Link
                    key={i.move.name}
                    href={{
                      pathname: `/move/[name]`,
                      query: { name: i.move.name },
                    }}
                  >
                    <p>
                      {removeDash(i.move.name)} +{i.change}
                    </p>
                  </Link>
                ))}
              </td>
            ),
          },
          {
            accessorKey: `affecting_moves.decrease`,
            header: `Decrease`,
            cell: (info) => (
              <td className={styles.stats}>
                {info.getValue<IMoveStatAffect[]>().map((i) => (
                  <Link
                    key={i.move.name}
                    href={{
                      pathname: `/move/[name]`,
                      query: { name: i.move.name },
                    }}
                  >
                    <p>
                      {removeDash(i.move.name)} {i.change}
                    </p>
                  </Link>
                ))}
              </td>
            ),
          },
        ],
      },
      {
        header: `Natures`,
        columns: [
          {
            accessorKey: `affecting_natures.increase`,
            header: `Increase`,
            cell: (info) => (
              <td className="tCapitalize">
                {info.getValue<INature[]>().map((i) => (
                  <p key={i.name}>{i.name}</p>
                ))}
              </td>
            ),
          },
          {
            accessorKey: `affecting_natures.decrease`,
            header: `Decrease`,
            cell: (info) => (
              <td className="tCapitalize">
                {info.getValue<INature[]>().map((i) => (
                  <p key={i.name}>{i.name}</p>
                ))}
              </td>
            ),
          },
        ],
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  return (
    <section>
      <h2 className="leftH2">Stats</h2>
      <section className="tableContainer" ref={tableContainerRef}>
        <table className="fullWidthTable">
          {tableHeader()}
          {tableBody()}
        </table>
      </section>
    </section>
  );
}
