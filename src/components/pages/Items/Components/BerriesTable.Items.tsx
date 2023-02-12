import { LeftTitle } from '@/components/common/styles/Headings';
import {
  FullWidthTable,
  TableContainer,
  TBold,
  TCapitalize,
} from '@/components/common/styles/Table';
import { useTableParams } from '@/hooks/useTableParams';
import { IBerry } from '@/types/Berries/Berry';
import { removeDash } from '@/utils/Typography';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

type Props = {
  berries: IBerry[];
};

function BerriesTable({ berries }: Props) {
  console.log(berries);

  const data = useMemo(() => berries, [berries]);

  const columns = useMemo<ColumnDef<IBerry>[]>(
    () => [
      {
        accessorKey: `name`,
        id: `sort`,
        header: `Name`,
        cell: (info) => <TBold>{removeDash(info.getValue<string>())}</TBold>,
      },
      {
        accessorKey: `firmness.name`,
        id: `firmness`,
        header: `Firmness`,
        cell: (info) => (
          <TCapitalize>{removeDash(info.getValue<string>())}</TCapitalize>
        ),
      },
      {
        accessorFn: (row) =>
          row.flavors.find((f) => f.potency > 0)?.flavor.name,
        id: `flavor`,
        header: `Flavor`,
        cell: (info) => <TCapitalize>{info.getValue<string>()}</TCapitalize>,
      },
      {
        accessorKey: `growth_time`,
        id: `growth`,
        header: `Growth`,
        cell: (info) => (
          <TCapitalize>{info.getValue<number>()} hr / stage</TCapitalize>
        ),
      },
      {
        accessorFn: (row) => row,
        id: `naturalGift`,
        header: `Natural Gift`,
        cell: (info) => (
          <TCapitalize>
            <p>{info.getValue<IBerry>().natural_gift_type.name}</p>
            <p>{info.getValue<IBerry>().natural_gift_power}</p>
          </TCapitalize>
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
        <FullWidthTable>
          {tableHeader()}
          {tableBody()}
        </FullWidthTable>
      </TableContainer>
    </section>
  );
}

export default BerriesTable;
