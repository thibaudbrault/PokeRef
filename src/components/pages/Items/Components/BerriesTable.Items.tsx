import { LeftTitle } from '@/components/common/styles/Headings';
import { TName, TLink, ModifiedTable, TableContainer } from '@/components/common/styles/Table';
import { useTableParams } from '@/hooks/useTableParams';
import { IBerry } from '@/types/Berries/Berry'
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import React, { useMemo } from 'react'
import { TCategoryItems, TEffectItems } from '../Styled.Items';

type Props = {
    berries: IBerry[];
}

function BerriesTable({ berries }: Props) {

    console.log(berries)

    const data = useMemo(() => berries, [berries]);

    const columns = useMemo<ColumnDef<IBerry>[]>(
        () => [
            {
                accessorKey: `name`,
                id: `sort`,
                header: `Name`,
                cell: (info) => (
                    <TName>
                        {info.getValue<string>().replace(/-/g, ` `)}
                    </TName>
                ),
            },
            {
                accessorKey: `firmness.name`,
                id: `firmness`,
                header: `Firmness`,
                cell: (info) => (
                    <TCategoryItems>
                        {info.getValue<string>().replace(/-/g, ` `)}
                    </TCategoryItems>
                ),
            },
            {
                accessorFn: (row) => row.flavors.find(f =>
                    f.potency > 0
                )?.flavor.name,
                id: `flavor`,
                header: `Flavor`,
                cell: (info) => (
                    <TCategoryItems>
                        {info.getValue<string>()}
                    </TCategoryItems>
                ),
            },
            {
                accessorKey: `growth_time`,
                id: `growth`,
                header: `Growth`,
                cell: (info) => (
                    <td>
                        {info.getValue<number>()} hr / stage
                    </td>
                ),
            },
            {
                accessorFn: (row) => row,
                id: `naturalGift`,
                header: `Natural Gift`,
                cell: (info) => (
                    <TCategoryItems>
                        <p>{info.getValue<IBerry>().natural_gift_type.name}</p>
                        <p>{info.getValue<IBerry>().natural_gift_power}</p>
                    </TCategoryItems>
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
            <LeftTitle>Berries</LeftTitle>
            <TableContainer ref={tableContainerRef}>
                <ModifiedTable>
                    {tableHeader()}
                    {tableBody()}
                </ModifiedTable>
            </TableContainer>
        </section>
    )
}

export default BerriesTable