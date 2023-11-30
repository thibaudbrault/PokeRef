import { useMemo } from 'react';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { errorToast, Loader } from '@/components';
import abilitiesJson from '@/data/abilities.json';
import { useScrollDir, useTableParams } from '@/hooks';
import { Heading, Search } from '@/modules/abilities';
import moves from '@/modules/moves/Moves.module.scss';
import { getLocalMultiple, QueryKeys, removeDash } from '@/utils';

import type { IAbility } from '@/types';

function AbilitiesPage() {
  const {
    isLoading,
    isError,
    error,
    data: abilities,
  }: UseQueryResult<IAbility[], Error> = useQuery({
    queryKey: [QueryKeys.ABILITIES],
    queryFn: () => getLocalMultiple(abilitiesJson),
  });

  const data = useMemo(() => abilities, [abilities]);
  const { scrollBtn } = useScrollDir();

  const columns = useMemo<ColumnDef<IAbility>[]>(
    () => [
      {
        accessorKey: `name`,
        id: `name`,
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

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

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
        </section>
        {scrollBtn()}
      </main>
    </>
  );
}

export default AbilitiesPage;
