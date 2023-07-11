import { useEffect, useMemo, useRef, useState } from 'react';

import { BisChevronDown, BisChevronUp } from '@meronex/icons/bi';
import {
  type PaginationState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import ReactPaginate from 'react-paginate';
import { useVirtual } from 'react-virtual';

// @ts-ignore
export function usePaginatedTableParams(data, columns) {
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

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows } = rowVirtualizer;

  const handlePageChange = (data: { selected: number }) => {
    window.scrollTo(0, 0);
    table.setPageIndex(data.selected);
  };

  useEffect(() => {
    table.setSorting([{ id: `sort`, desc: false }]);

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                            ? `cursor-pointer select-none`
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
        {virtualRows.map((virtualRow) => {
          const row = rows[virtualRow.index];
          return (
            <tr className="tr" key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </>
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
        pageCount={table.getPageCount()}
        previousLabel="<"
        renderOnZeroPageCount={() => null}
      />
    );
  };

  return {
    sorting,
    tableContainerRef,
    tableHeader,
    tableBody,
    tablePagination,
  };
}
