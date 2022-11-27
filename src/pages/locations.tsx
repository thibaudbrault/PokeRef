import React, { useState, useEffect } from 'react';

import { MainBig } from '../components/Common/Sizing';
import {
  LocationList,
  LocationSection,
} from '../components/Locations/StyledLocations';
import Loader from '../components/Loader/Loader';
import { useLocations } from '../../src/helpers/DataFetch';
import { regions } from '../../src/helpers/DataMap';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Locations, Sort } from '@/types/types';
import Head from 'next/head';

const RegionsMethod = dynamic(
  () => import(`../../src/helpers/RegionsMethod.jsx`),
);

function Locations() {
  const [location, setLocation] = useState<string | null>(null);
  const [toggleState, setToggleState] = useState<number>(0);
  const { isLoading, error, data: locations } = useLocations();

  const toggleTable = (index: number) => {
    setToggleState(index);
  };

  useEffect(() => {
    setLocation(regions[toggleState + 1]);
  }, [toggleState]);

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Locations | Pokeref</title>
        <meta
          name="description"
          content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
        />
        <meta property="og:title" content="Locations | Pokeref" />
        <meta
          property="og:description"
          content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
        />
        <meta property="og:url" content="https://pokeref.app/locations" />
        <meta property="og:type" content="website" />
      </Head>
      <MainBig>
        <RegionsMethod toggleState={toggleState} toggleTable={toggleTable} />
        <LocationSection>
          {locations?.map(
            (l: Locations) =>
              l?.name === location &&
              location !== `galar` && (
                <LocationList>
                  {l?.locations
                    ?.sort(({ a, b }: Sort) => a.name.localeCompare(b.name))
                    ?.map((ll) => (
                      <li key={l.name}>
                        <Link
                          href={{
                            pathname: `/location/[name]`,
                            query: { name: ll.name },
                          }}
                          key={ll.name}
                        >
                          {ll?.name
                            ?.replace(/-/g, ` `)
                            ?.replace(
                              /kanto|johto|hoenn|sinnoh|unova|kalos|alola/g,
                              ``,
                            )}
                        </Link>
                      </li>
                    ))}
                </LocationList>
              ),
          )}
        </LocationSection>

        {location === `galar` ? (
          <LocationSection>
            <p>No data for Galar</p>
          </LocationSection>
        ) : null}
      </MainBig>
    </>
  );
}

export default Locations;