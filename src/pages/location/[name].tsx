import React from 'react';
import { MainBig, Section } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import { CardTitle, Subtitle } from '@/components/common/styles/Headings';
import { LocationTable } from '@/components/pages/Locations/Styled.Locations';
import Nav from '@/components/pages/Locations/LocationCard/Components/Nav.LocationCard';
import { TableContainer } from '@/components/common/styles/Table';
import Link from 'next/link';
import BackBtn from '@/components/common/ui/BackBtn';
import { useSwitchGame } from '@/components/pages/Locations/LocationCard/Hooks/useSwitchGame';
import dynamic from 'next/dynamic';
import { useRouterIsReady } from '@/hooks/useRouterIsReady';

const TableHead = dynamic(() => import(`@/components/common/ui/TableHead`));
const HeadingLocation = dynamic(
  () => import(`@/components/pages/Locations/LocationCard/Heading`),
);
const AreaLocationCard = dynamic(
  () =>
    import(
      `@/components/pages/Locations/LocationCard/Components/Area.LocationCard`
    ),
);
const TableLocationCard = dynamic(
  () =>
    import(
      `@/components/pages/Locations/LocationCard/Components/Table.LocationCard`
    ),
);

function LocationCard() {
  const { name } = useRouterIsReady();

  const {
    game,
    setGame,
    isLoading,
    error,
    toggleState,
    toggleTable,
    location,
    area,
  } = useSwitchGame(name);

  const tableHead: string[] = [
    `Pokemon`,
    `Location`,
    `Probability`,
    `Level`,
    `Condition`,
  ];

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

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
        <AreaLocationCard
          location={location}
          toggleState={toggleState}
          toggleTable={toggleTable}
        />
        <Nav setGame={setGame} />
        <Section>
          <TableContainer>
            <LocationTable>
              <TableHead array={tableHead} />
              <TableLocationCard area={area} game={game} />
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
