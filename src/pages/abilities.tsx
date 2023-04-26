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
import SearchAbilities from '@/components/pages/Abilities/Components/Search.Abilities';
import { SearchContainer } from '@/components/pages/Moves/Styled.Moves';
import { useTableParams } from '@/hooks/useTableParams';
import { IAbility } from '@/types/Pokemon/Ability';
import { getAbilities } from '@/utils/DataFetch';
import { removeDash } from '@/utils/Typography';
import {
  dehydrate,
  QueryClient,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

const HeadingAbilities = dynamic(
  () => import(`@/components/pages/Abilities/Heading`),
);

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

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

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
      <HeadingAbilities />
      <MainBig>
        <SearchContainer>
          <LeftH2>Abilities</LeftH2>
          <SearchAbilities abilities={abilities} />
        </SearchContainer>
        <TableContainer ref={tableContainerRef}>
          <FullWidthTable>
            {tableHeader()}
            {tableBody()}
          </FullWidthTable>
        </TableContainer>
      </MainBig>
    </>
  );
}

export default AbilitiesPage;

export async function getStaticProps() {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: [`abilities`],
    queryFn: getAbilities,
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
