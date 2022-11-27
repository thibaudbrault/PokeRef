import React, { useState, useEffect } from 'react';
import { LeftTitle } from '../../Common/Headings';
import { Input, ModifiedSearch } from '../../Common/Inputs';
import {
  Table,
  TableContainer,
  TEffect,
  THead,
  TLink,
  TName,
  TRow,
} from '../../Common/Table';
import { Type } from '../../Common/Themes';
import { MovesSection, TCategory, TType } from '../StyledMoves';
import Link from 'next/link';
import Image from 'next/image';
import { Moves } from '@/types/types';

type Props = {
  moves: Moves[];
  toggleState: number;
};

function MovesTable({ moves, toggleState }: Props) {
  const [search, setSearch] = useState<string>(``);
  const [filteredMoves, setFilteredMoves] = useState<any[]>([]);

  // Filter the moves returned when the user type the name in the search bar
  useEffect(
    () =>
      setFilteredMoves(
        moves.filter((moves: Moves) =>
          moves.name
            .replace(/-/g, ` `)
            .toLowerCase()
            .includes(search.toLowerCase()),
        ),
      ),
    [search, moves],
  );

  return (
    <MovesSection visibility={toggleState === 1}>
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
              ?.sort((a, b) => a.name.localeCompare(b.name))
              ?.map((m: Moves) => (
                <TRow key={m.id}>
                  <TName>
                    <TLink
                      href={{
                        pathname: `/move/[name]`,
                        query: { name: m.name },
                      }}
                      key={m.name}
                    >
                      {m?.name?.replace(/-/g, ` `)}
                    </TLink>
                  </TName>
                  <TCategory id={m?.damage_class?.name}>
                    <div>
                      <Image alt={m.damage_class.name} width={20} height={20} />
                      <span>{m?.damage_class?.name}</span>
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
                        <Image alt={m.type.name} width={15} height={15} />
                        <span>{m?.type?.name}</span>
                      </Link>
                    </Type>
                  </TType>
                  <TEffect>
                    {m?.flavor_text_entries?.map(
                      (mf) =>
                        mf.language.name === `en` &&
                        mf.flavor_text !== `Dummy Data` && (
                          <span key={mf.flavor_text}>{mf?.flavor_text}</span>
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
