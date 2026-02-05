import { Fragment, useMemo, useRef, useState } from 'react';

import { BisChevronDown, BisChevronUp } from '@meronex/icons/bi';
import {
  ColumnDef,
  type PaginationState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import ReactPaginate from 'react-paginate';

import { IAbility, IItem, IMove } from '@/types';

// @ts-ignore
export function usePaginatedTableParams(
  data: any[] | undefined,
  columns: ColumnDef<any>[],
  setOffset: (offset: number) => void,
  limit: number,
  pathname: string,
  router: AppRouterInstance,
  searchParams: URLSearchParams,
) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    pageCount: Math.ceil(limit / 50),
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const parentRef = useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();
  const virtualizer = useVirtualizer({
    getScrollElement: () => parentRef.current,
    count: rows.length,
    estimateSize: () => 70,
    overscan: 10,
  });

  const handlePageChange = (data: { selected: number }) => {
    window.scrollTo(0, 0);
    table.setPageIndex(data.selected);
    setOffset((data.selected * 50) % limit);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', (data.selected + 1).toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const tableHeader = () => {
    return (
      <thead className="tHead">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: header.getSize() }}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? `sortable select-none`
                            : ``,
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: <BisChevronUp />,
                          desc: <BisChevronDown />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
    );
  };

  const tableBody = () => {
    return (
      <tbody>
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];
          return (
            <tr
              className="tr"
              key={row.id}
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${
                  virtualRow.start - virtualRow.index * virtualRow.size
                }px)`,
              }}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <Fragment key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Fragment>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };

  const tablePagination = () => {
    return (
      <ReactPaginate
        containerClassName="pagination"
        breakLabel="..."
        onPageChange={handlePageChange}
        nextLabel=">"
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={Math.ceil(limit / 50)}
        previousLabel="<"
        renderOnZeroPageCount={() => null}
      />
    );
  };

  return {
    sorting,
    parentRef,
    tableHeader,
    tableBody,
    tablePagination,
  };
}
