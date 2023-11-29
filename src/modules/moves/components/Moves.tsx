import { useMemo } from 'react';

import { type ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';

import { usePaginatedTableParams } from '@/hooks';
import { removeDash } from '@/utils';

import styles from '../Moves.module.scss';
import { Search } from './Search';

import type { IMove } from '@/types';

type Props = {
  moves?: IMove[];
};

export function Moves({ moves }: Props) {
  const data = useMemo(() => moves, [moves]);

  const columns = useMemo<ColumnDef<IMove>[]>(
    () => [
      {
        accessorKey: `name`,
        id: `sort`,
        header: `Name`,
        cell: (info) => (
          <td className="tBold">
            <Link
              className="tLink"
              id={info.getValue<string>()}
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
        accessorKey: `type.name`,
        id: `type`,
        header: `Type`,
        cell: (info) => (
          <td className="tType">
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
        accessorKey: `damage_class.name`,
        id: `category`,
        header: `Category`,
        cell: (info) => (
          <td className="tCategory" id={info.getValue<string>()}>
            <div>
              <Image
                alt={info.getValue<string>()}
                width={20}
                height={20}
                src={`/images/status/move-${info.getValue()}.png`}
              />
              <span>{info.getValue<string>()}</span>
            </div>
          </td>
        ),
      },
      {
        accessorFn: (row) =>
          row.flavor_text_entries.find((rf) => {
            return rf.language.name === `en` && rf.flavor_text !== `Dummy Data`;
          })?.flavor_text || `-`,
        id: `effect`,
        header: `Effect`,
        cell: (info) => <td className="tEffect">{info.getValue<string>()}</td>,
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody, tablePagination } =
    usePaginatedTableParams(data, columns);

  return (
    <section>
      <div className={styles.search}>
        <h2 className="leftH2">Moves</h2>
        <Search moves={moves} />
      </div>
      <div className="tableContainer" ref={tableContainerRef}>
        <table className="fullWidthTable">
          {tableHeader()}
          {tableBody()}
        </table>
        {tablePagination()}
      </div>
    </section>
  );
}
