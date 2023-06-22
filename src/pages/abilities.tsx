import { LeftH2 } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import {
  FullWidthTable,
  TableContainer,
  TBold,
  TEffect,
  TLink,
} from '@/components/common/styles/Table';
import Loader from '@/components/common/ui/Loader/Loader';
import { usePaginatedTableParams } from '@/hooks/usePaginatedTableParams';
import { SearchContainer } from '@/modules/Moves/Styled.Moves';
import { Heading, Search } from '@/modules/abilities';
import { IAbility } from '@/types';
import { getAbilities, removeDash } from '@/utils';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

function AbilitiesPage() {
  const {
    isLoading,
    isError,
    error,
    data: abilities,
  }: UseQueryResult<IAbility[], Error> = useQuery({
    queryKey: [`abilities`],
    queryFn: getAbilities,
  });

  const data = useMemo(() => abilities, [abilities]);

  const columns = useMemo<ColumnDef<IAbility>[]>(
    () => [
      {
        accessorKey: `name`,
        id: `sort`,
        header: `Name`,
        cell: (info) => (
          <TBold>
            <TLink
              href={{
                pathname: `/ability/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {removeDash(info.getValue<string>())}
            </TLink>
          </TBold>
        ),
      },
      {
        accessorFn: (row) =>
          row.flavor_text_entries.find((rf) => {
            return rf.language.name === `en`;
          })?.flavor_text || `-`,
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

  if (isError) {
    return toast.error(`Something went wrong: ${error.message}`, {
      style: {
        fontSize: `1.7rem`,
      },
    });
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading />
      <MainBig>
        <SearchContainer>
          <LeftH2>Abilities</LeftH2>
          <Search abilities={abilities} />
        </SearchContainer>
        <TableContainer ref={tableContainerRef}>
          <FullWidthTable>
            {tableHeader()}
            {tableBody()}
          </FullWidthTable>
          {tablePagination()}
        </TableContainer>
      </MainBig>
    </>
  );
}

export default AbilitiesPage;
