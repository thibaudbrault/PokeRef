import { Capitalize, H3 } from '@/components/common/styles/Headings';
import { Section } from '@/components/common/styles/Sizing';
import {
  FullWidthTable,
  TableContainer,
} from '@/components/common/styles/Table';
import { useTableParams } from '@/hooks/useTableParams';
import { IMove, IType } from '@/types';
import { removeDash } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useMemo } from 'react';
import {
  TypeListSubtitle,
  TypeListSubtitleContainer,
  TypeMovesComment,
  TypeMovesData,
  TypeMovesName,
} from '../Styled.TypeCard';

type Props = {
  type?: IType;
  moves?: IMove[];
};

export function Moves({ type, moves }: Props) {
  const data = useMemo(
    () => [
      ...new Set(
        type?.moves
          .map((tm) => moves?.filter((m) => m.name === tm.name))
          .flat(),
      ),
    ],
    [type?.moves, moves],
  );

  const columns = useMemo<ColumnDef<IMove>[]>(
    () => [
      {
        accessorKey: `name`,
        id: `sort`,
        header: `Name`,
        cell: (info) => (
          <TypeMovesName>
            <Link
              href={{
                pathname: `/move/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {removeDash(info.getValue<string>())}
            </Link>
          </TypeMovesName>
        ),
      },
      {
        accessorKey: `damage_class.name`,
        id: `category`,
        header: `Category`,
        cell: (info) => (
          <TypeMovesData>{info.getValue<string>()}</TypeMovesData>
        ),
      },
      {
        accessorKey: `power`,
        id: `power`,
        header: `Power`,
        cell: (info) => (
          <TypeMovesData>{info.getValue<string>() || `-`}</TypeMovesData>
        ),
      },
      {
        accessorKey: `pp`,
        id: `pp`,
        header: `PP`,
        cell: (info) => (
          <TypeMovesData>{info.getValue<string>()}</TypeMovesData>
        ),
      },
      {
        accessorKey: `accuracy`,
        id: `accuracy`,
        header: `Accuracy`,
        cell: (info) => (
          <TypeMovesData>{info.getValue<string>() || `-`}</TypeMovesData>
        ),
      },
      {
        accessorKey: `meta.ailment.name`,
        id: `status`,
        header: `Status`,
        cell: (info) => (
          <TypeMovesData>
            {info.getValue<string>() !== `none` || !info.getValue<string>()
              ? info.getValue<string>()
              : `-`}
          </TypeMovesData>
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
    <Section>
      <H3>Moves</H3>
      <TypeListSubtitleContainer>
        <TypeListSubtitle>
          {data.length} moves are <Capitalize>{type?.name}</Capitalize> type
        </TypeListSubtitle>
      </TypeListSubtitleContainer>
      <TableContainer ref={tableContainerRef}>
        {data.length > 0 && (
          <FullWidthTable>
            {tableHeader()}
            {tableBody()}
          </FullWidthTable>
        )}
      </TableContainer>
      {type?.name !== `fairy` && (
        <TypeMovesComment>
          <Capitalize>{type?.name}</Capitalize> attacks were{` `}
          <Capitalize>{type?.move_damage_class?.name}</Capitalize> before Gen IV
        </TypeMovesComment>
      )}
    </Section>
  );
}
