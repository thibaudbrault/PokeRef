import { LeftTitle } from '@/components/common/styles/Headings';
import { ModifiedTable, TableContainer, TLink, TName } from '@/components/common/styles/Table';
import { useTableParams } from '@/hooks/useTableParams';
import { IItem } from '@/types/Items/Item';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { useMemo } from 'react';
import { TCategoryItems, TEffectItems } from '../Styled.Items';

type Props = {
    items: IItem[];
}

function ItemsTable({ items }: Props) {

    const data = useMemo(() => items, [items]);

    const columns = useMemo<ColumnDef<IItem>[]>(
        () => [
            {
                accessorKey: `sprites.default`,
                id: `sprites`,
                header: `Sprite`,
                cell: (info) => (
                    <td>
                        <Image
                            src={info.getValue<string>() || ``}
                            alt="-"
                            width={30}
                            height={30}
                        />
                    </td>
                ),
            },
            {
                accessorKey: `name`,
                id: `sort`,
                header: `Name`,
                cell: (info) => (
                    <TName>
                        <TLink
                            href={{
                                pathname: `/item/[name]`,
                                query: { name: info.getValue<string>() },
                            }}
                        >
                            {info.getValue<string>().replace(/-/g, ` `)}
                        </TLink>
                    </TName>
                ),
            },
            {
                accessorKey: `category.name`,
                id: `category`,
                header: `Category`,
                cell: (info) => (
                    <TCategoryItems>
                        {info.getValue<string>().replace(/-/g, ` `)}
                    </TCategoryItems>
                ),
            },
            {
                accessorFn: (row) =>
                    row.effect_entries.find((re) => {
                        return re;
                    })?.short_effect,
                id: `effect`,
                header: `Effect`,
                cell: (info) => (
                    <TEffectItems>
                        <span>{info.getValue<string>()}</span>
                    </TEffectItems>
                ),
            },
        ],
        [],
    );

    const { tableContainerRef, tableHeader, tableBody } = useTableParams(
        data,
        columns,
    );

    return (
        <section>
            <LeftTitle>Items</LeftTitle>
            <TableContainer ref={tableContainerRef}>
                <ModifiedTable>
                    {tableHeader()}
                    {tableBody()}
                </ModifiedTable>
            </TableContainer>
        </section>
    )
}

export default ItemsTable