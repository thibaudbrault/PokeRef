import React, { useState, useEffect } from 'react';

import { GenNav } from '@/components/common/styles/Navbars';
import { Input } from '@/components/common/styles/Inputs';
import { LeftTitle } from '@/components/common/styles/Headings';
import { THead, TLink, TName, TRow } from '@/components/common/styles/Table';
import { MainBig } from '@/components/common/styles/Sizing';
import { useMachines } from '@/hooks/DataFetch';
import {
  MachinesSearch,
  MachinesTable,
} from '@/components/pages/Machines/Styled.Machines';
import Loader from '@/components/common/ui/Loader/Loader';
import { Machines } from '@/types/types';
import Head from 'next/head';
import { genNav } from '@/utils/DataArrays';

function MachinesPage() {
  const [search, setSearch] = useState<string | null>(null);
  const [filteredMachines, setFilteredMachines] = useState<any>([]);

  const { isLoading, error, data: machines } = useMachines();

  // Filter the moves returned when the user type the name in the search bar
  const filterMachines = search
    ? machines?.filter((machines: Machines.Machines) =>
        machines.move.name
          .replace(/-/g, ` `)
          .toLowerCase()
          .includes(search.toLowerCase()),
      )
    : machines;

  // New request when the user types a letter
  useEffect(
    () => setFilteredMachines(filterMachines),
    [search, filteredMachines, filterMachines],
  );

  // Set default version for the list of returned machines to 'red-blue'
  const [version, setVersion] = useState(`red-blue`);

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Machines | Pokeref</title>
        <meta
          name="description"
          content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
        />
        <meta property="og:title" content="Machines | Pokeref" />
        <meta
          property="og:description"
          content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
        />
        <meta property="og:url" content="https://pokeref.app/machines" />
        <meta property="og:type" content="website" />
      </Head>
      <MainBig>
        <LeftTitle>Machines</LeftTitle>
        <MachinesSearch>
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
        </MachinesSearch>

        <GenNav>
          <ol>
            {genNav.map((g) => (
              <li key={g.gen}>
                <button>{g.gen}</button>
                <div>
                  {g.details.map((gd) => (
                    <button
                      key={gd.version}
                      onClick={() => {
                        setVersion(gd.version);
                      }}
                    >
                      {gd.game}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </GenNav>

        <MachinesTable>
          <THead>
            <tr>
              <th>Name</th>
              <th>Moves</th>
            </tr>
          </THead>
          <tbody>
            {filteredMachines?.map(
              (ma: Machines.Machines) =>
                ma.version_group.name === version && (
                  <TRow key={ma.item.name}>
                    <TName>{ma.item.name.toUpperCase()}</TName>
                    <td>
                      <TLink
                        href={{
                          pathname: `/move/[name]`,
                          query: { name: ma.move.name },
                        }}
                        key={ma.move.name}
                        passHref
                      >
                        {ma.move.name.replace(/-/g, ` `)}
                      </TLink>
                    </td>
                  </TRow>
                ),
            )}
          </tbody>
        </MachinesTable>
      </MainBig>
    </>
  );
}

export default MachinesPage;
