import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { LeftTitle } from '@/components/common/styles/Headings';
import { Input, ModifiedSearch } from '@/components/common/styles/Inputs';
import {
  ModifiedTable,
  Table,
  TableContainer,
  TEffect,
  TLink,
  TName,
} from '@/components/common/styles/Table';
import { Type } from '@/components/common/styles/Themes';
import { MovesSection, TCategory, TType } from '../Styled.Moves';
import Link from 'next/link';
import Image from 'next/image';
import { Moves } from '@/types/types';
import { useTableParams } from '@/hooks/useTableParams';

type Props = {
  moves?: Moves.Moves[];
};

function MovesTable({ moves }: Props) {
  const data = useMemo(() => moves, [moves]);

  const columns = useMemo<ColumnDef<Moves.Moves>[]>(
    () => [
      {
        accessorKey: `name`,
        id: `sort`,
        header: `Name`,
        cell: (info) => (
          <TName>
            <TLink
              href={{
                pathname: `/move/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {info.getValue<string>().replace(/-/g, ` `)}
            </TLink>
          </TName>
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
    <MovesSection>
      <LeftTitle>Moves</LeftTitle>
      <TableContainer ref={tableContainerRef}>
        <ModifiedTable>
          {tableHeader()}
          {tableBody()}
        </ModifiedTable>
      </TableContainer>
    </MovesSection>
  );
}

export default MovesTable;
