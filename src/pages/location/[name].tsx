import { CardTitle, Subtitle } from '@/components/common/styles/Headings';
import { MainBig, Section } from '@/components/common/styles/Sizing';
import { TableContainer } from '@/components/common/styles/Table';
import BackBtn from '@/components/common/ui/BackBtn';
import Loader from '@/components/common/ui/Loader/Loader';
import { useSwitchGame } from '@/components/pages/Locations/LocationCard/Hooks/useSwitchGame';
import { LocationTable } from '@/components/pages/Locations/Styled.Locations';
import { useTableParams } from '@/hooks/useTableParams';
import { ILocationArea } from '@/types/Locations/LocationArea';
import { IEncounter } from '@/types/Utility/CommonModels';
import { removeDash } from '@/utils/Typography';
import { ColumnDef } from '@tanstack/react-table';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

const HeadingLocation = dynamic(
  () => import(`@/components/pages/Locations/LocationCard/Heading`),
);
const Nav = dynamic(
  () => import(`@/components/common/ui/GenNav`),
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
    version,
    setVersion,
    toggleState,
    toggleTable,
    isLoading,
    isError,
    error,
    location,
    area,
  } = useSwitchGame(name);

  const data = useMemo(
    () =>
      game &&
      area?.pokemon_encounters
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
      //   //   <TBold>hello</TBold>
      // },
      {
        accessorKey: `method.name`,
        id: `method`,
        header: `Method`,
        cell: (info) => <td>{removeDash(info.getValue<string>())}</td>,
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
            <td>{removeDash(info.getValue<boolean>().toString())}</td>
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

  if (isError) {
    return toast.error(`Something went wrong: ${error.message}`);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeadingLocation name={name} />
      <MainBig>
        <CardTitle>
          {removeDash(location?.name).replace(
            /kanto|johto|hoenn|sinnoh|unova|kalos|alola|galar|hisui|paldea/g,
            ``,
          )}
        </CardTitle>
        <Subtitle>
          {game && `${location?.region.name} - ${removeDash(game)}`}
        </Subtitle>
        <AreaLocationCard
          location={location}
          toggleState={toggleState}
          toggleTable={toggleTable}
        />
        <Nav setGame={setGame} setVersion={setVersion} />
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
