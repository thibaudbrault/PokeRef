import React from 'react';
import { LeftTitle } from '@/components/common/styles/Headings';
import {
  THead,
  TableContainer,
  ModifiedTable,
} from '@/components/common/styles/Table';
import { ModifiedMainBig } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import ModifiedSearchUi from '@/components/common/ui/ModifiedSearch.ui';
import { useFilterAbilities } from '@/components/pages/Abilities/Hooks/useFilterAbilities';
import dynamic from 'next/dynamic';

const HeadingAbilities = dynamic(
  () => import(`@/components/pages/Abilities/Heading`),
);
const ListAbilities = dynamic(
  () => import(`@/components/pages/Abilities/Components/List.Abilities`),
);

function AbilitiesPage() {
  const { setSearch, isLoading, error, filterAbilities, filterEffect } =
    useFilterAbilities();

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeadingAbilities />
      <ModifiedMainBig>
        <LeftTitle>Abilities</LeftTitle>
        <ModifiedSearchUi placeholder="Ability Name" setSearch={setSearch} />
        <TableContainer>
          <ModifiedTable>
            <THead>
              <tr>
                <th>Name</th>
                <th>Effect</th>
              </tr>
            </THead>
            <tbody>
              <ListAbilities
                filterAbilities={filterAbilities}
                filterEffect={filterEffect}
              />
            </tbody>
          </ModifiedTable>
        </TableContainer>
      </ModifiedMainBig>
    </>
  );
}

export default AbilitiesPage;
