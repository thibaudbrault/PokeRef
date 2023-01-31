import React from 'react';
import { LeftTitle } from '@/components/common/styles/Headings';
import {
  ModifiedTable,
  TableContainer,
  TEffect,
  TLink,
  TName,
} from '@/components/common/styles/Table';
import { ModifiedMainBig } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import ModifiedSearchUi from '@/components/common/ui/ModifiedSearch.ui';
import { useFilterAbilities } from '@/components/pages/Abilities/Hooks/useFilterAbilities';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Abilities } from '@/types/types';
import { useTableParams } from '@/hooks/useTableParams';
import { useAbilities } from '@/hooks/DataFetch';

const HeadingAbilities = dynamic(
  () => import(`@/components/pages/Abilities/Heading`),
);

function AbilitiesPage() {
  // const { setSearch, isLoading, error, abilities } =
  //   useFilterAbilities();
  const { isLoading, error, data: abilities } = useAbilities();

  const data = useMemo(() => abilities, [abilities])

  const columns = useMemo<ColumnDef<Abilities.Abilities>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: info =>
          <TName>
            <TLink
              href={{
                pathname: `/ability/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {info.getValue<string>().replace(/-/g, ` `)}
            </TLink>
          </TName>
      },
      {
        accessorKey: "id",
        header: "Effect",
        cell: info =>
          <TEffect>
            <span>{info.getValue<string>()}</span>
          </TEffect>
      },
      {
        accessorKey: "id",
        header: "Effect",
        cell: info =>
          <TEffect>
            <span>{info.getValue<string>()}</span>
          </TEffect>
      },
      {
        accessorKey: "id",
        header: "Effect",
        cell: info =>
          <TEffect>
            <span>{info.getValue<string>()}</span>
          </TEffect>
      }
    ],
    []
  )

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(data, columns)

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
        <TableContainer ref={tableContainerRef}>
          <ModifiedTable>
            {tableHeader()}
            {tableBody()}
          </ModifiedTable>
        </TableContainer>
      </ModifiedMainBig>
    </>
  );
}

export default AbilitiesPage;
