import { LeftH2 } from '@/components/common/styles/Headings';
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
import { usePaginatedTableParams } from '@/hooks/usePaginatedTableParams';
import { IMove } from '@/types/Moves/Move';
import { removeDash } from '@/utils/Typography';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { SearchContainer } from '../Styled.Moves';
import SearchMoves from './Search.Moves';

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
              id={info.getValue<string>()}
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
                  width={20}
                  height={20}
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

  const { tableContainerRef, tableHeader, tableBody, tablePagination } =
    usePaginatedTableParams(data, columns);

  return (
    <section>
      <SearchContainer>
        <LeftH2>Moves</LeftH2>
        <SearchMoves moves={moves} />
      </SearchContainer>
      <TableContainer ref={tableContainerRef}>
        <FullWidthTable>
          {tableHeader()}
          {tableBody()}
        </FullWidthTable>
        {tablePagination()}
      </TableContainer>
    </section>
  );
}

export default MovesTable;
