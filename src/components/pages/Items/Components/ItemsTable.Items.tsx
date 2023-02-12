import { LeftTitle } from '@/components/common/styles/Headings';
import {
  FullWidthTable,
  TableContainer,
  TBold,
  TCapitalize,
  TLink,
} from '@/components/common/styles/Table';
import { useTableParams } from '@/hooks/useTableParams';
import { IItem } from '@/types/Items/Item';
import { removeDash } from '@/utils/Typography';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { useMemo } from 'react';

type Props = {
  items: IItem[];
};

function ItemsTable({ items }: Props) {
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
          <td>
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
      <LeftTitle>Items</LeftTitle>
      <TableContainer ref={tableContainerRef}>
        <FullWidthTable>
          {tableHeader()}
          {tableBody()}
        </FullWidthTable>
      </TableContainer>
    </section>
  );
}

export default ItemsTable;
