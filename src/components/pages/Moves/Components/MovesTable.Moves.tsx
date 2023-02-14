import { LeftTitle } from '@/components/common/styles/Headings';
import {
  FullWidthTable,
  TableContainer,
  TBold,
  TCategory,
  TEffect,
  TLink,
  TType,
} from '@/components/common/styles/Table';
import { Type } from '@/components/common/styles/Themes';
import { useTableParams } from '@/hooks/useTableParams';
import { IMove } from '@/types/Moves/Move';
import { removeDash } from '@/utils/Typography';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

type Props = {
  moves?: IMove[];
};

function MovesTable({ moves }: Props) {
  const data = useMemo(() => moves, [moves]);

  const columns = useMemo<ColumnDef<IMove>[]>(
    () => [
      {
        accessorKey: `name`,
        id: `sort`,
        header: `Name`,
        cell: (info) => (
          <TBold>
            <TLink
              href={{
                pathname: `/move/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {removeDash(info.getValue<string>())}
            </TLink>
          </TBold>
        ),
      },
      {
        accessorKey: `damage_class.name`,
        id: `category`,
        header: `Category`,
        cell: (info) => (
          <TCategory id={info.getValue<string>()}>
            <div>
              <Image
                alt={info.getValue<string>()}
                width={20}
                height={20}
                src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/seals/home/move-${info.getValue()}.png`}
              />
              <span>{info.getValue<string>()}</span>
            </div>
          </TCategory>
        ),
      },
      {
        accessorKey: `type.name`,
        id: `type`,
        header: `Type`,
        cell: (info) => (
          <TType>
            <Type id={info.getValue<string>()}>
              <Link
                href={{
                  pathname: `/type/[name]`,
                  query: { name: info.getValue<string>() },
                }}
              >
                <Image
                  alt={info.getValue<string>()}
                  width={15}
                  height={15}
                  src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${info.getValue()}.png`}
                />
                <span>{info.getValue<string>()}</span>
              </Link>
            </Type>
          </TType>
        ),
      },
      {
        accessorFn: (row) =>
          row.flavor_text_entries.find((rf) => {
            return rf.language.name === `en` && rf.flavor_text !== `Dummy Data`;
          })?.flavor_text || `-`,
        id: `effect`,
        header: `Effect`,
        cell: (info) => <TEffect>{info.getValue<string>()}</TEffect>,
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
      <LeftTitle>Moves</LeftTitle>
      <TableContainer ref={tableContainerRef}>
        <FullWidthTable>
          {tableHeader()}
          {tableBody()}
        </FullWidthTable>
      </TableContainer>
    </section>
  );
}

export default MovesTable;
