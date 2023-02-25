import { CardTitle, Subtitle } from '@/components/common/styles/Headings';
import { MainBig, Section } from '@/components/common/styles/Sizing';
import { TableContainer, TBold } from '@/components/common/styles/Table';
import BackBtn from '@/components/common/ui/BackBtn';
import Loader from '@/components/common/ui/Loader/Loader';
import { useSwitchGame } from '@/components/pages/Locations/LocationCard/Hooks/useSwitchGame';
import { LocationTable } from '@/components/pages/Locations/Styled.Locations';
import { useTableParams } from '@/hooks/useTableParams';
import { IPokemonEncounter } from '@/types/Locations/LocationArea';
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
const Nav = dynamic(() => import(`@/components/common/ui/GenNav`));
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
    setVersion,
    toggleState,
    toggleTable,
    isLoading,
    isError,
    error,
    location,
    area,
  } = useSwitchGame(name);

  const filteredArea = area?.pokemon_encounters
    .map((a) => {
      const version_details = a.version_details.filter(
        (av) => av.version.name === game,
      );
      return {
        ...a,
        version_details,
      };
    })
    .filter((a) => a.version_details.length);

  const data = useMemo(() => game && filteredArea, [area, game]);

  const columns = useMemo<ColumnDef<IPokemonEncounter>[]>(
    () => [
      {
        accessorKey: `pokemon.name`,
        id: `name`,
        header: `Pokemon`,
        cell: (info) => <TBold>{info.getValue<string>()}</TBold>,
      },
      {
        accessorFn: (row) => row.version_details[0].encounter_details,
        id: `level`,
        header: `Level`,
        cell: (info) => (
          <td>
            {info.getValue<IEncounter[]>().map((i) => (
              <p key={i.max_level}>{i.max_level}</p>
            ))}
          </td>
        ),
      },
      {
        accessorFn: (row) => row.version_details[0].encounter_details,
        id: `chance`,
        header: `Probability`,
        cell: (info) => (
          <td>
            {info.getValue<IEncounter[]>().map((i) => (
              <p key={i.chance}>{i.chance} %</p>
            ))}
          </td>
        ),
      },
      {
        accessorFn: (row) => row.version_details[0].encounter_details,
        id: `method`,
        header: `Method`,
        cell: (info) => (
          <td>
            {info.getValue<IEncounter[]>().map((i) => (
              <p key={i.method.name}>{removeDash(i.method.name)}</p>
            ))}
          </td>
        ),
      },
      {
        accessorFn: (row) => row.version_details[0].encounter_details,
        id: `condition`,
        header: `Condition`,
        cell: (info) => (
          <td>
            {info
              .getValue<IEncounter[]>()
              .map((i) =>
                i.condition_values.length > 0 ? (
                  i.condition_values.map((icv) => (
                    <p key={icv.name}>{removeDash(icv.name)}</p>
                  ))
                ) : (
                  <p key={i.min_level + i.max_level}>-</p>
                ),
              )}
          </td>
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
    return toast.error(`Something went wrong: ${error?.message}`);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeadingLocation name={name} />
      <MainBig>
        <CardTitle>
          {location &&
            removeDash(location?.name).replace(
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
