import React, { } from 'react';
import { MainBig, Section } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import { CardTitle, Subtitle } from '@/components/common/styles/Headings';
import {
  LocationNavContainer,
  LocationTable,
} from '@/components/pages/Locations/Styled.Locations';
import Nav from '@/components/pages/Locations/LocationCard/Components/Nav.LocationCard';
import {
  TableContainer,
  THead,
} from '@/components/common/styles/Table';
import { useRouter } from 'next/router';
import Link from 'next/link';
import BackBtn from '@/components/common/ui/BackBtn';
import { useSwitchGame } from '@/components/pages/Locations/LocationCard/Hooks/useSwitchGame';
import dynamic from 'next/dynamic';

const HeadingLocation = dynamic(
  () => import('@/components/pages/Locations/LocationCard/Heading')
);
const AreaLocationCard = dynamic(
  () => import('@/components/pages/Locations/LocationCard/Components/Area.LocationCard')
);
const TableLocationCard = dynamic(
  () => import('@/components/pages/Locations/LocationCard/Components/Table.LocationCard')
);

function LocationCard() {
  const router = useRouter();
  const { name } = router.query;

  const { game, setGame, isLoading, error, toggleState, toggleTable, location, area } = useSwitchGame(name)

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  console.log(area)

  return (
    <>
      <HeadingLocation name={name} />
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
          <AreaLocationCard location={location} toggleState={toggleState} toggleTable={toggleTable} />
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
                <TableLocationCard area={area} game={game} />
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
