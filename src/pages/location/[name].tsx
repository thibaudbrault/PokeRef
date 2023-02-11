import { CardTitle, Subtitle } from '@/components/common/styles/Headings';
import { MainBig, Section } from '@/components/common/styles/Sizing';
import { TableContainer } from '@/components/common/styles/Table';
import BackBtn from '@/components/common/ui/BackBtn';
import Loader from '@/components/common/ui/Loader/Loader';
import Nav from '@/components/pages/Locations/LocationCard/Components/Nav.LocationCard';
import { useSwitchGame } from '@/components/pages/Locations/LocationCard/Hooks/useSwitchGame';
import { LocationTable } from '@/components/pages/Locations/Styled.Locations';
import { useTableParams } from '@/hooks/useTableParams';
import { ILocationArea } from '@/types/Locations/LocationArea';
import { IEncounter } from '@/types/Utility/CommonModels';
import { ColumnDef } from '@tanstack/react-table';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo } from 'react';

const HeadingLocation = dynamic(
  () => import(`@/components/pages/Locations/LocationCard/Heading`),
);
const AreaLocationCard = dynamic(
  () =>
    import(
      `@/components/pages/Locations/LocationCard/Components/Area.LocationCard`
    ),
);

type Props = {
  name: string;
};

function LocationCard({ name }: Props) {
  const {
    game,
    setGame,
    toggleState,
    toggleTable,
    isLoading,
    error,
    location,
    area,
  } = useSwitchGame(name);

  const data = useMemo(
    () =>
      game && area?.pokemon_encounters
        .map((a) => a.version_details.filter((av) => av.version.name === game))
        .flat()
        .map((ave) => ave.encounter_details)
        .flat(),
    [area, game],
  );

  const columns = useMemo<ColumnDef<ILocationArea>[]>(
    () => [
      // {
      //   accessorFn: (row) => console.log(row),
      //   id: `name`,
      //   header: `Pokemon`,
      //   // cell: info =>
      //   //   <TName>hello</TName>
      // },
      {
        accessorKey: `method.name`,
        id: `method`,
        header: `Method`,
        cell: (info) => <td>{info.getValue<string>().replace(/-/g, ` `)}</td>,
      },
      {
        accessorKey: `chance`,
        id: `sort`,
        header: `Probability`,
        cell: (info) => <td>{info.getValue<string>()} %</td>,
      },
      {
        accessorKey: `max_level`,
        id: `level`,
        header: `Level`,
        cell: (info) => <td>{info.getValue<string>()}</td>,
      },
      {
        accessorFn: (row: IEncounter) =>
          row.condition_values.length > 0 &&
          row.condition_values.map((rcv) => {
            return rcv.name;
          }),
        id: `condition`,
        header: `Condition`,
        cell: (info) =>
          info.getValue() ? (
            <td>{info.getValue<boolean>().toString().replace(/-/g, ` `)}</td>
          ) : (
            <td>-</td>
          ),
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

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
          {location?.region.name} - {game?.replace(/-/g, ` `)}
        </Subtitle>
        <AreaLocationCard
          location={location}
          toggleState={toggleState}
          toggleTable={toggleTable}
        />
        <Nav setGame={setGame} />
        <Section>
          <TableContainer ref={tableContainerRef}>
            <LocationTable>
              {tableHeader()}
              {tableBody()}
              <tfoot>
                <tr>
                  <td colSpan={5}>This area is not present in this game</td>
                </tr>
              </tfoot>
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

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { name } = context.query;
  return {
    props: {
      name,
    },
  };
}
