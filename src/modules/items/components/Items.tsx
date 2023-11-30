import { useMemo } from 'react';

import { type ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';

import { usePaginatedTableParams, useScrollDir, useTableParams } from '@/hooks';
import moves from '@/modules/moves/Moves.module.scss';
import { removeDash } from '@/utils';

import { Search } from './Search';

import type { IItem } from '@/types';

type Props = {
  items?: IItem[];
};

export function Items({ items }: Props) {
  const data = useMemo(() => items, [items]);
  const { scrollBtn } = useScrollDir();

  const columns = useMemo<ColumnDef<IItem>[]>(
    () => [
      {
        accessorKey: `sprites.default`,
        id: `sprites`,
        header: `Sprite`,
        cell: (info) => (
          <td>
            <Image
              src={info.getValue<string>() || ``}
              alt="-"
              width={30}
              height={30}
            />
          </td>
        ),
      },
      {
        accessorKey: `name`,
        id: `name`,
        header: `Name`,
        cell: (info) => (
          <td className="tBold">
            <Link
              className="tLink"
              href={{
                pathname: `/item/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {removeDash(info.getValue<string>()).replaceAll(`--`, `-`)}
            </Link>
          </td>
        ),
      },
      {
        accessorKey: `category.name`,
        id: `category`,
        header: `Category`,
        cell: (info) => (
          <td className="tCapitalize">{removeDash(info.getValue<string>())}</td>
        ),
      },
      {
        accessorFn: (row) =>
          row.effect_entries.find((re) => {
            return re;
          })?.short_effect,
        id: `effect`,
        header: `Effect`,
        cell: (info) => (
          <td className="tEffect">
            <span>{info.getValue<string>()}</span>
          </td>
        ),
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
      <div className={moves.search}>
        <h2 className="leftH2">Items</h2>
        <Search items={items} />
      </div>
      <div className="tableContainer" ref={tableContainerRef}>
        <table className="fullWidthTable">
          {tableHeader()}
          {tableBody()}
        </table>
      </div>
      {scrollBtn()}
    </section>
  );
}
