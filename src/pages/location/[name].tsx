import React, { useEffect, useState } from 'react';

import { MainBig, Section } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import { useArea, useLocation } from '@/hooks/DataFetch';
import { CardTitle, Subtitle } from '@/components/common/styles/Headings';
import {
  LocationNavContainer,
  LocationNav,
  LocationTable,
} from '@/components/pages/Locations/Styled.Locations';
import Nav from '@/components/pages/Locations/LocationCard/Nav/Nav.LocationCard';
import {
  TableContainer,
  THead,
  TName,
  TRow,
} from '@/components/common/styles/Table';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Locations } from '@/types/types';
import BackBtn from '@/components/common/ui/BackBtn';

function LocationCard() {
  const router = useRouter();
  const { name } = router.query;

  const [game, setGame] = useState(`red`);
  const [toggleState, setToggleState] = useState(0);
  const {
    isLoading,
    error,
    data: location,
  } = useLocation(`https://pokeapi.co/api/v2/location/${name}`);

  const toggleTable = (index: number) => {
    setToggleState(index);
  };

  const areaUrl = location?.areas[toggleState]?.url;

  const { data: area } = useArea(areaUrl);

  const gameUsed = () => {
    switch (location?.region.name) {
      case `kanto`:
        setGame(`yellow`);
        break;
      case `johto`:
        setGame(`crystal`);
        break;
      case `hoenn`:
        setGame(`emerald`);
        break;
      case `sinnoh`:
        setGame(`platinum`);
        break;
      case `unova`:
        setGame(`black-2`);
        break;
      case `kalos`:
        setGame(`x`);
        break;
      case `alola`:
        setGame(`ultra-sun`);
        break;
    }
  };

  useEffect(() => {
    gameUsed();
  }, [location?.region.name]);

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>
          {typeof name === `string` &&
            name?.charAt(0).toUpperCase() + name?.slice(1)}
          {` `}| Location | PokéRef
        </title>
        <meta name="description" content={`Find every details about ${name}`} />
        <meta property="og:title" content={`${name} | Location | PokéRef`} />
        <meta
          property="og:description"
          content={`Find every details about ${name}`}
        />
        <meta
          property="og:url"
          content={`https://pokeref.app/location/${name}`}
        />
        <meta property="og:type" content="website" />
      </Head>
      <MainBig>
        <CardTitle>
          {location?.name
            .replace(/-/g, ` `)
            .replace(/kanto|johto|hoenn|sinnoh|unova|kalos|alola/, ``)}
        </CardTitle>
        <Subtitle>
          {location?.region.name} - {game.replace(/-/g, ` `)}
        </Subtitle>
        <LocationNavContainer>
          <LocationNav>
            {location?.areas?.map((la, i) => (
              <button
                key={la.name}
                className={toggleState === i ? `button_active` : ``}
                onClick={() => toggleTable(i)}
              >
                <p>
                  {la.name
                    .replace(/-/g, ` `)
                    .replace(/kanto|johto|hoenn|sinnoh|unova|kalos|alola/, ``)
                    .replace(/area/, ``)}
                </p>
              </button>
            ))}
          </LocationNav>
          <span>There is no information about this area</span>
        </LocationNavContainer>
        <Nav setGame={setGame} />
        <Section>
          <TableContainer>
            <LocationTable>
              <THead>
                <tr>
                  <th>Pokemon</th>
                  <th>Location</th>
                  <th>Probability</th>
                  <th>Level</th>
                  <th>Condition</th>
                </tr>
              </THead>
              <tbody>
                {area?.pokemon_encounters?.map((a: Locations.Pokemon) =>
                  a.version_details?.map(
                    (av) =>
                      av.version.name === game &&
                      av.encounter_details?.map((ave) => (
                        <TRow key={a.pokemon.name}>
                          <TName>{a.pokemon.name.replace(/-/g, ` `)}</TName>
                          <td>{ave.method.name.replace(/-/g, ` `)}</td>
                          <td>{ave.chance} %</td>
                          <td>
                            {ave.max_level === ave.min_level ? (
                              <span>{ave.max_level}</span>
                            ) : (
                              <span>
                                {ave.min_level} - {ave.max_level}
                              </span>
                            )}
                          </td>
                          {ave.condition_values.length !== 0 ? (
                            <td>
                              {ave.condition_values?.map((avec) => (
                                <p key={avec.name}>
                                  {avec.name.replace(/-/g, ` `)}
                                </p>
                              ))}
                            </td>
                          ) : (
                            <td>-</td>
                          )}
                        </TRow>
                      )),
                  ),
                )}
              </tbody>
              <span>This area is not present in this game</span>
            </LocationTable>
          </TableContainer>
        </Section>
        <Link href="/locations" passHref>
          <BackBtn name="Locations" />
        </Link>
      </MainBig>
    </>
  );
}

export default LocationCard;
