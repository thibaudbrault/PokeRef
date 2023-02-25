import { LeftTitle } from '@/components/common/styles/Headings';
import {
  FullWidthTable,
  TableContainer,
  TBold,
  TCapitalize,
} from '@/components/common/styles/Table';
import { useTableParams } from '@/hooks/useTableParams';
import { INature } from '@/types/Pokemon/Nature';
import { IMoveStatAffect, IStat } from '@/types/Pokemon/Stat';
import { removeDash } from '@/utils/Typography';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useMemo } from 'react';
import { StatsMoves } from '../Styled.Moves';

type Props = {
  stats?: IStat[];
};

function StatsTable({ stats }: Props) {
  const data = useMemo(() => stats?.filter((s) => s.name !== `hp`), [stats]);

  const columns = useMemo<ColumnDef<IStat>[]>(
    () => [
      {
        header: `Stats`,
        columns: [
          {
            accessorKey: `name`,
            id: `sort`,
            cell: (info) => (
              <TBold>{removeDash(info.getValue<string>())}</TBold>
            ),
          },
        ],
      },
      {
        header: `Moves`,
        columns: [
          {
            accessorKey: `affecting_moves.increase`,
            header: `Increase`,
            cell: (info) => (
              <StatsMoves>
                {info.getValue<IMoveStatAffect[]>().map((i) => (
                  <Link
                    key={i.move.name}
                    href={{
                      pathname: `/move/[name]`,
                      query: { name: i.move.name },
                    }}
                  >
                    <p>
                      {removeDash(i.move.name)} +{i.change}
                    </p>
                  </Link>
                ))}
              </StatsMoves>
            ),
          },
          {
            accessorKey: `affecting_moves.decrease`,
            header: `Decrease`,
            cell: (info) => (
              <StatsMoves>
                {info.getValue<IMoveStatAffect[]>().map((i) => (
                  <Link
                    key={i.move.name}
                    href={{
                      pathname: `/move/[name]`,
                      query: { name: i.move.name },
                    }}
                  >
                    <p>
                      {removeDash(i.move.name)} {i.change}
                    </p>
                  </Link>
                ))}
              </StatsMoves>
            ),
          },
        ],
      },
      {
        header: `Natures`,
        columns: [
          {
            accessorKey: `affecting_natures.increase`,
            header: `Increase`,
            cell: (info) => (
              <TCapitalize>
                {info.getValue<INature[]>().map((i) => (
                  <p key={i.name}>{i.name}</p>
                ))}
              </TCapitalize>
            ),
          },
          {
            accessorKey: `affecting_natures.decrease`,
            header: `Decrease`,
            cell: (info) => (
              <TCapitalize>
                {info.getValue<INature[]>().map((i) => (
                  <p key={i.name}>{i.name}</p>
                ))}
              </TCapitalize>
            ),
          },
        ],
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
      <LeftTitle>Stats</LeftTitle>
      <TableContainer ref={tableContainerRef}>
        <FullWidthTable>
          {tableHeader()}
          {tableBody()}
        </FullWidthTable>
      </TableContainer>
    </section>
  );
}

export default StatsTable;
