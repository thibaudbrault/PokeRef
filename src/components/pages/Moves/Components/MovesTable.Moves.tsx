import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { LeftTitle } from '@/components/common/styles/Headings';
import { Input, ModifiedSearch } from '@/components/common/styles/Inputs';
import {
  Table,
  TableContainer,
  TLink,
  TName,
} from '@/components/common/styles/Table';
import { Type } from '@/components/common/styles/Themes';
import { MovesSection, TCategory, TType } from '../Styled.Moves';
import Link from 'next/link';
import Image from 'next/image';
import { Moves } from '@/types/types';
import { useTableParams } from "@/hooks/useTableParams";

type Props = {
  moves?: Moves.Moves[];
};

function MovesTable({ moves }: Props) {

  const [search, setSearch] = useState<string>(``);

  const filterMoves = search
    ? moves.filter((moves: Moves.Moves) =>
      moves.name
        .replace(/-/g, ` `)
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
    : moves;

  const filterEffect = filterMoves.map((m) =>
    m.flavor_text_entries.find(
      (mf) => mf.language.name === `en` && mf.flavor_text !== `Dummy Data`,
    ),
  );

  const data = useMemo(() => moves, [moves]);
  console.log(data)

  const columns = useMemo<ColumnDef<Moves.Moves>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: info =>
          <TName>
            <TLink href={{
              pathname: `/move/[name]`,
              query: { name: info.getValue<string>() },
            }}
            >
              {info.getValue<string>().replace(/-/g, ` `)}
            </TLink>
          </TName>
      },
      {
        accessorKey: "damage_class.name",
        header: "Category",
        cell: info =>
          <TCategory id={info.getValue<string>()}>
            <div>
              <Image
                alt={info.getValue<string>()}
                width={20}
                height={20}
                src={``}
              />
              <span>{info.getValue<string>()}</span>
            </div>
          </TCategory>
      },
      {
        header: "Type",
        accessorKey: "type.name",
        cell: info =>
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
                  src={``}
                />
                <span>{info.getValue<string>()}</span>
              </Link>
            </Type>
          </TType>
      },
      // {
      //   header: "Effect",
      //   accessorKey: "filterEffect?.flavor_text",
      //   cell: info =>
      //     <TEffect>
      //       <span>{info.getValue<span>()}</span>
      //     </TEffect>
      // }
    ],
    []
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(data, columns)

  return (
    <MovesSection>
      <LeftTitle>Moves</LeftTitle>
      <ModifiedSearch>
        <Input>
          <label htmlFor="searchBar">Search</label>
          <input
            type="text"
            placeholder="Move Name"
            name="searchBar"
            id="searchBar"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Input>
      </ModifiedSearch>
      <TableContainer ref={tableContainerRef}>
        <Table>
          {tableHeader()}
          {tableBody()}
        </Table>
      </TableContainer>
    </MovesSection>
  );
}

export default MovesTable;