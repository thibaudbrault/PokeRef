import { useEffect, useRef, useState } from 'react';

import { BisChevronDown, BisChevronUp } from '@meronex/icons/bi';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

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

  const parentRef = useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();
  const virtualizer = useVirtualizer({
    getScrollElement: () => parentRef.current,
    count: rows.length,
    estimateSize: () => 70,
    overscan: 5,
  });
  // const { virtualItems: virtualRows } = virtualizer;

  useEffect(() => {
    table.setSorting([{ id: `sort`, desc: false }]);
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
        {virtualizer.getVirtualItems().map((virtualRow, index) => {
          const row = rows[virtualRow.index];
          return (
            <tr
              className="tr"
              key={row.id}
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${
                  virtualRow.start - index * virtualRow.size
                }px)`,
              }}
            >
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

  return { sorting, parentRef, tableHeader, tableBody };
}
