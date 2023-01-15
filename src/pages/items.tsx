import React from 'react';
import { MainBig } from '@/components/common/styles/Sizing';
import { LeftTitle } from '@/components/common/styles/Headings';
import { Table, THead } from '@/components/common/styles/Table';
import Loader from '@/components/common/ui/Loader/Loader';
import { useFilterItems } from '@/components/pages/Items/Hooks/useFilterItems';
import HeadingItems from '@/components/pages/Items/Heading';
import dynamic from 'next/dynamic';

const ModifiedSearchUi = dynamic(
  () => import(`@/components/common/ui/ModifiedSearch.ui`),
);
const ListItems = dynamic(
  () => import(`@/components/pages/Items/Components/List.Items`),
);

function ItemsPage() {
  const { setSearch, isLoading, error, filterItems } = useFilterItems();

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
        <ModifiedSearchUi placeholder="Item Name" setSearch={setSearch} />
        <Table>
          <THead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Effect</th>
            </tr>
          </THead>
          <tbody>
            <ListItems filterItems={filterItems} />
          </tbody>
        </Table>
      </MainBig>
    </>
  );
}

export default ItemsPage;
