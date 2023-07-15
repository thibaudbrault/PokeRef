import { useMemo } from 'react';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Loader, errorToast } from '@/components';
import { usePaginatedTableParams } from '@/hooks';
import { Heading, Search } from '@/modules/abilities';
import moves from '@/modules/moves/Moves.module.scss';
import { getAbilities, removeDash } from '@/utils';

import type { IAbility } from '@/types';

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
          <td className="tBold">
            <Link
              className="tLink"
              href={{
                pathname: `/ability/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {removeDash(info.getValue<string>())}
            </Link>
          </td>
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
          <td className="tEffect">
            <span>{info.getValue<string>()}</span>
          </td>
        ),
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody, tablePagination } =
    usePaginatedTableParams(data, columns);

  if (isError && error instanceof Error) {
    errorToast(error.message);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading />
      <main className="mainBig">
        <div className={moves.search}>
          <h2 className="leftH2">Abilities</h2>
          <Search abilities={abilities} />
        </div>
        <section className="tableContainer" ref={tableContainerRef}>
          <table className="fullWidthTable">
            {tableHeader()}
            {tableBody()}
          </table>
          {tablePagination()}
        </section>
      </main>
    </>
  );
}

export default AbilitiesPage;
