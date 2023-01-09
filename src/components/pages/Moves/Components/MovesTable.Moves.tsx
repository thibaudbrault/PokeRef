import React, { useState, useEffect } from 'react';
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
  const [filteredMoves, setFilteredMoves] = useState<Moves.Moves[]>([]);

  // Filter the moves returned when the user type the name in the search bar
  useEffect(
    () =>
      setFilteredMoves(
        moves.filter((moves: Moves.Moves) =>
          moves.name
            .replace(/-/g, ` `)
            .toLowerCase()
            .includes(search.toLowerCase()),
        ),
      ),
    [search, moves],
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
            {filteredMoves
              .sort((a, b) => a.name.localeCompare(b.name))
              ?.map((m: Moves.Moves) => (
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
                  <TCategory id={m.damage_class.name}>
                    <div>
                      <Image
                        alt={m.damage_class.name}
                        width={20}
                        height={20}
                        src={``}
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
                          src={``}
                        />
                        <span>{m.type.name}</span>
                      </Link>
                    </Type>
                  </TType>
                  <TEffect>
                    {m.flavor_text_entries?.map(
                      (mf) =>
                        mf.language.name === `en` &&
                        mf.flavor_text !== `Dummy Data` && (
                          <span key={mf.flavor_text}>{mf.flavor_text}</span>
                        ),
                    )}
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
