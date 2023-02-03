import { useRef, useState } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import { BisChevronUp, BisChevronDown } from "@meronex/icons/bi";
import { useVirtual } from "react-virtual";
import { THead, TRow } from "@/components/common/styles/Table";

export function useTableParams(data, columns) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data: data ? data : [],
        columns,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true
    });

    const tableContainerRef = useRef<HTMLDivElement>(null);

    const { rows } = table.getRowModel();
    const rowVirtualizer = useVirtual({
        parentRef: tableContainerRef,
        size: rows.length,
        overscan: 10
    });
    const { virtualItems: virtualRows } = rowVirtualizer;

    const tableHeader = () => {
        return (
            <THead>
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
                                                        ? "cursor-pointer select-none"
                                                        : "",
                                                    onClick: header.column.getToggleSortingHandler()
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: <BisChevronUp />,
                                                    desc: <BisChevronDown />
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        </>
                                    )}
                                </th>
                            );
                        })}
                    </tr>
                ))}
            </THead>
        )
    }

    const tableBody = () => {
        return (
            <tbody>
                {virtualRows.map((virtualRow) => {
                    const row = rows[virtualRow.index];
                    return (
                        <TRow key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                return (
                                    <>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </>
                                );
                            })}
                        </TRow>
                    );
                })}
            </tbody>
        )
    }

    return { tableContainerRef, tableHeader, tableBody }
}