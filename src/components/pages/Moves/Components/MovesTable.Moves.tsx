import React, { useState } from 'react';
import { LeftTitle } from '@/components/common/styles/Headings';
import { Input, ModifiedSearch } from '@/components/common/styles/Inputs';
import {
  Table,
  TableContainer,
  TEffect,
  THead,
  TLink,
  TName,
  TRow,
} from '@/components/common/styles/Table';
import { Type } from '@/components/common/styles/Themes';
import { MovesSection, TCategory, TType } from '../Styled.Moves';
import Link from 'next/link';
import Image from 'next/image';
import { Moves } from '@/types/types';

type Props = {
  moves: Moves.Moves[];
  toggleState: number;
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
      <TableContainer>
        <Table>
          <THead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Type</th>
              <th>Effect</th>
            </tr>
          </THead>
          <tbody data-testid="movesBody">
            {filterMoves
              .sort((a, b) => a.name.localeCompare(b.name))
              ?.map((m: Moves.Moves, i) => (
                <TRow key={m.id}>
                  <TName>
                    <TLink
                      href={{
                        pathname: `/move/[name]`,
                        query: { name: m.name },
                      }}
                      key={m.name}
                    >
                      {m.name.replace(/-/g, ` `)}
                    </TLink>
                  </TName>
                  <TCategory>
                    <div>
                      <Image
                        src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/seals/home/move-${m.damage_class.name}.png`}
                        alt={m.damage_class.name}
                        width={20}
                        height={20}
                      />
                      <span>{m.damage_class.name}</span>
                    </div>
                  </TCategory>
                  <TType>
                    <Type id={m.type.name}>
                      <Link
                        href={{
                          pathname: `/type/[name]`,
                          query: { name: m.type.name },
                        }}
                      >
                        <Image
                          alt={m.type.name}
                          width={15}
                          height={15}
                          src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${m.type.name}.png`}
                        />
                        <span>{m.type.name}</span>
                      </Link>
                    </Type>
                  </TType>
                  <TEffect>
                    <span>{filterEffect?.[i]?.flavor_text}</span>
                  </TEffect>
                </TRow>
              ))}
          </tbody>
        </Table>
      </TableContainer>
    </MovesSection>
  );
}

export default MovesTable;
