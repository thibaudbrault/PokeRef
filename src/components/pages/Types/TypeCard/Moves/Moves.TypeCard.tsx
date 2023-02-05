import React, { useEffect, useMemo, useState } from 'react';
import { H3, Span } from '@/components/common/styles/Headings';
import { Section } from '@/components/common/styles/Sizing';
import { TableContainer } from '@/components/common/styles/Table';
import {
  TypeListSubtitle,
  TypeMovesTable,
  TypeMovesComment,
  TypeMovesData,
  TypeMovesName,
} from '../Styled.TypeCard';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { IType } from '@/types/Pokemon/Type';
import { useTableParams } from '@/hooks/useTableParams';
import { IMove } from '@/types/Moves/Move';

type Props = {
  type?: IType;
  moves?: IMove[];
};

function MovesType({ type, moves }: Props) {

  const [filteredMoves, setFilteredMoves] = useState([])

  useEffect(() => {
    setFilteredMoves(
      type?.moves.map(tm =>
        moves?.filter(m =>
          m.name === tm.name
        )
      )
    );
  }, [])

  const data = useMemo(() => [].concat(...filteredMoves), [filteredMoves])

  const columns = useMemo<ColumnDef<IMove>[]>(
    () => [
      {
        accessorKey: "name",
        id: "sort",
        header: "Name",
        cell: info => (
          <TypeMovesName>
            <Link
              href={{
                pathname: `/move/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {info.getValue<string>().replace(/-/g, ` `)}
            </Link>
          </TypeMovesName>
        )
      },
      {
        accessorKey: "damage_class.name",
        id: "category",
        header: "Category",
        cell: info =>
          <TypeMovesData>{info.getValue<string>()}</TypeMovesData>
      },
      {
        accessorKey: "power",
        id: "power",
        header: "Power",
        cell: info =>
          <TypeMovesData>{info.getValue<string>() || '-'}</TypeMovesData>
      },
      {
        accessorKey: "pp",
        id: "pp",
        header: "PP",
        cell: info =>
          <TypeMovesData>{info.getValue<string>()}</TypeMovesData>
      },
      {
        accessorKey: "accuracy",
        id: "accuracy",
        header: "Accuracy",
        cell: info =>
          <TypeMovesData>{info.getValue<string>() || '-'}</TypeMovesData>
      },
      {
        accessorKey: "meta.ailment.name",
        id: "status",
        header: "Status",
        cell: info =>
          <TypeMovesData>{info.getValue<string>() !== 'none' ? info.getValue<string>() : '-'}</TypeMovesData>
      },
    ],
    []
  )

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  return (
    <Section>
      <H3>Moves</H3>
      <TypeListSubtitle>
        {filteredMoves.length} moves are <Span>{type?.name}</Span> type
      </TypeListSubtitle>
      <TableContainer ref={tableContainerRef}>
        {filteredMoves.length > 0 &&
          <TypeMovesTable>
            {tableHeader()}
            {tableBody()}
          </TypeMovesTable>
        }
      </TableContainer>
      {type?.name !== `fairy` && (
        <TypeMovesComment>
          <Span>{type?.name}</Span> attacks were{` `}
          <Span>{type?.move_damage_class?.name}</Span> before Gen IV
        </TypeMovesComment>
      )}
    </Section>
  );
}

export default MovesType;
