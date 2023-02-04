import React, { useMemo } from 'react';
import { MainBig } from '@/components/common/styles/Sizing';
import { LeftTitle } from '@/components/common/styles/Headings';
import {
  Table,
  TableContainer,
  TLink,
  TName,
} from '@/components/common/styles/Table';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingItems from '@/components/pages/Items/Heading';
import { getItems } from '@/utils/DataFetch';
import { useQuery } from 'react-query';
import { useTableParams } from '@/hooks/useTableParams';
import {
  TCategoryItems,
  TEffectItems,
} from '@/components/pages/Items/Styled.Items';
import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { IItem } from '@/types/Items/Item';

type Props = {
  initialItems: IItem[];
};

function ItemsPage({ initialItems }: Props) {
  const {
    isLoading,
    error,
    data: items,
  } = useQuery({
    queryKey: [`items`],
    queryFn: getItems,
    // initialData: initialItems
  });

  const data = useMemo(() => items, [items]);

  const columns = useMemo<ColumnDef<IItem>[]>(
    () => [
      {
        accessorKey: `sprites.default`,
        id: `sprites`,
        header: `Sprites`,
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
          <TName>
            <TLink
              href={{
                pathname: `/item/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {info.getValue<string>().replace(/-/g, ` `)}
            </TLink>
          </TName>
        ),
      },
      {
        accessorKey: `category.name`,
        id: `category`,
        header: `Category`,
        cell: (info) => (
          <TCategoryItems>
            {info.getValue<string>().replace(/-/g, ` `)}
          </TCategoryItems>
        ),
      },
      {
        accessorKey: `effect_entries[0].short_effect`,
        id: `effect`,
        header: `Effect`,
        cell: (info) => (
          <TEffectItems>
            <span>{info.getValue<string>()}</span>
          </TEffectItems>
        ),
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeadingItems />
      <MainBig>
        <LeftTitle>Items</LeftTitle>
        <TableContainer ref={tableContainerRef}>
          <Table>
            {tableHeader()}
            {tableBody()}
          </Table>
        </TableContainer>
      </MainBig>
    </>
  );
}

export default ItemsPage;

// export async function getServerSideProps() {
//   const initialItems = await getItems()
//   return {
//     props: {
//       initialItems
//     }
//   }
// }
