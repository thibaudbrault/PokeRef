import { LeftH2 } from '@/components/common/styles/Headings';
import {
  FullWidthTable,
  TableContainer,
  TBold,
  TCapitalize,
  TEffect,
  TLink,
} from '@/components/common/styles/Table';
import { usePaginatedTableParams } from '@/hooks/usePaginatedTableParams';
import { IItem } from '@/types';
import { removeDash } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { useMemo } from 'react';
import { Search } from './Search';
import { SearchContainer } from '@/modules/moves/Styled.Moves';

type Props = {
  items?: IItem[];
};

export function Items({ items }: Props) {
  const data = useMemo(() => items, [items]);

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
        id: `sort`,
        header: `Name`,
        cell: (info) => (
          <TBold>
            <TLink
              href={{
                pathname: `/item/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {removeDash(info.getValue<string>())}
            </TLink>
          </TBold>
        ),
      },
      {
        accessorKey: `category.name`,
        id: `category`,
        header: `Category`,
        cell: (info) => (
          <TCapitalize>{removeDash(info.getValue<string>())}</TCapitalize>
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
          <TEffect>
            <span>{info.getValue<string>()}</span>
          </TEffect>
        ),
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody, tablePagination } =
    usePaginatedTableParams(data, columns);

  return (
    <section>
      <SearchContainer>
        <LeftH2>Items</LeftH2>
        <Search items={items} />
      </SearchContainer>
      <TableContainer ref={tableContainerRef}>
        <FullWidthTable>
          {tableHeader()}
          {tableBody()}
        </FullWidthTable>
        {tablePagination()}
      </TableContainer>
    </section>
  );
}
