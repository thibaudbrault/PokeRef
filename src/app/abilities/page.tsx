'use client';

import { useMemo, useState } from 'react';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { errorToast, Loader } from '@/components';
import { usePaginatedTableParams, useScrollDir } from '@/hooks';
import { Heading, Search } from '@/modules/abilities';
import moves from '@/modules/moves/Moves.module.scss';
import { BASE_URL, getMultiple, Limit, QueryKeys, removeDash } from '@/utils';

import type { IAbility } from '@/types';

function AbilitiesPage() {
  const limit = 50;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const pageParam = searchParams.get('page');
  const initialPage = pageParam ? parseInt(pageParam, 10) - 1 : 0;
  const [offset, setOffset] = useState(initialPage * limit);

  const {
    isFetching,
    isError,
    error,
    status: abilitiesStatus,
    data: abilities,
  } = useQuery<IAbility[], Error>({
    queryKey: [QueryKeys.ABILITIES, limit, offset],
    queryFn: () =>
      getMultiple(`${BASE_URL}/ability?limit=${limit}&offset=${offset}`),
    placeholderData: keepPreviousData,
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
            <Link className="tLink" href={`/abilities/${info.getValue()}`}>
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
    usePaginatedTableParams(data, columns, setOffset, Limit.ABILITIES, pathname, router, searchParams);

  if (isError && error instanceof Error) {
    errorToast(error.message, `abilities`);
  }

  if (abilitiesStatus === `pending`) {
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
          {isFetching ? (
            <Loader />
          ) : (
            <table className="fullWidthTable">
              {tableHeader()}
              {tableBody()}
            </table>
          )}
        </section>
        {tablePagination()}
        {scrollBtn()}
      </main>
    </>
  );
}

export default AbilitiesPage;
