/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useEffect, useRef, useState } from 'react';

import { BisChevronDown, BisChevronUp } from '@meronex/icons/bi';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';

// @ts-ignore
export function useTableParams(data, columns) {
  const emptyArray: never[] = [];
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data || emptyArray,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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

  return { sorting, tableContainerRef, tableHeader, tableBody };
}
