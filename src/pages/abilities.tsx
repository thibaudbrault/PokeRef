import React, { useState, useEffect } from 'react';

import { LeftTitle } from '../components/Common/Headings';
import { Input, ModifiedSearch } from '../components/Common/Inputs';
import {
  THead,
  TName,
  TRow,
  TEffect,
  TLink,
  TableContainer,
  ModifiedTable,
} from '../components/Common/Table';
import { ModifiedMainBig } from '../components/Common/Sizing';
import { useAbilities } from '../helpers/DataFetch';
import Loader from '../components/Loader/Loader';
import { Abilities, Sort } from '@/types/types';
import Head from 'next/head';

function Abilities() {
  const [search, setSearch] = useState<string | null>(null);
  const [filteredAbilities, setFilteredAbilities] = useState<any>([]);
  const { isLoading, error, data: abilities } = useAbilities();

  // Filter the abilities returned when the user type the name in the search bar
  const filterAbilities = search
    ? abilities?.filter((abilities) =>
        abilities.name
          .replace(/-/g, ` `)
          .toLowerCase()
          .includes(search?.toLowerCase()),
      )
    : abilities;

  // New request when the user types a letter
  useEffect(
    () => setFilteredAbilities(filterAbilities),
    [search, filterAbilities],
  );

  console.log(filteredAbilities);

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Abilities | Pokeref</title>
        <meta
          name="description"
          content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
        />
        <meta property="og:title" content="Abilities | Pokeref" />
        <meta
          property="og:description"
          content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
        />
        <meta property="og:url" content="https://pokeref.app/abilities" />
        <meta property="og:type" content="website" />
      </Head>
      <ModifiedMainBig>
        <LeftTitle>Abilities</LeftTitle>
        <ModifiedSearch>
          <Input>
            <label htmlFor="searchBar">Search</label>
            <input
              type="text"
              placeholder="Ability Name"
              name="searchBar"
              id="searchBar"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Input>
        </ModifiedSearch>
        <TableContainer>
          <ModifiedTable>
            <THead>
              <tr className="abilities_table_head_row">
                <th className="abilities_table_head_row_element">Name</th>
                <th className="abilities_table_head_row_element">Effect</th>
              </tr>
            </THead>
            <tbody>
              {filteredAbilities
                ?.sort(({ a, b }: Sort) => a.name.localeCompare(b.name))
                .map((a: Abilities) => (
                  <TRow key={a.name}>
                    <TName>
                      <TLink
                        href={{
                          pathname: `/ability/[name]`,
                          query: { name: a.name },
                        }}
                      >
                        {a.name.replace(/-/g, ` `)}
                      </TLink>
                    </TName>
                    <TEffect>
                      {a.flavor_text_entries.map(
                        (af) =>
                          af.language.name === `en` && (
                            <span key={af.flavor_text}>{af.flavor_text}</span>
                          ),
                      )}
                    </TEffect>
                  </TRow>
                ))}
            </tbody>
          </ModifiedTable>
        </TableContainer>
      </ModifiedMainBig>
    </>
  );
}

export default Abilities;
