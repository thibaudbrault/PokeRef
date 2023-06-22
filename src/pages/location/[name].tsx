import { CardTitle, Subtitle } from '@/components/common/styles/Headings';
import { MainBig, Section } from '@/components/common/styles/Sizing';
import { TBold, TLink, TableContainer } from '@/components/common/styles/Table';
import BackBtn from '@/components/common/ui/BackBtn';
import Loader from '@/components/common/ui/Loader/Loader';
import styles from '@/components/pages/Locations/Locations.module.scss';
import { useTableParams } from '@/hooks/useTableParams';
import { Area, Heading, useSwitchGame } from '@/modules/locations/location';
import {
  IEncounter,
  IEncounterConditionValue,
  IEncounterMethod,
  IName,
  IPokemonEncounter,
} from '@/types';
import { removeDash } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const Nav = dynamic(() => import(`@/components/common/ui/GenNav`));

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
    encounter,
    method,
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

  const filteredEncounter = useCallback(
    (condition: string) => {
      return encounter.data?.find(
        (e: IEncounterConditionValue) => e.name === condition,
      );
    },
    [encounter.data],
  );

  const filteredMethod = useCallback(
    (condition: string) => {
      return method.data?.find((m: IEncounterMethod) => m.name === condition);
    },
    [method.data],
  );

  const [data, setData] = useState<IPokemonEncounter[]>([]);

  useEffect(() => {
    if (filteredArea) {
      setData(filteredArea);
    }
  }, [filteredArea, game]);

  const columns = useMemo<ColumnDef<IPokemonEncounter>[]>(
    () => [
      {
        accessorKey: `pokemon.name`,
        id: `name`,
        header: `Pokemon`,
        cell: (info) => (
          <TBold>
            <TLink
              href={{
                pathname: `/pokemon/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {removeDash(info.getValue<string>())}
            </TLink>
          </TBold>
        ),
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
              <p key={i.method.name}>
                {
                  filteredMethod(i.method.name).names.find(
                    (en: IName) => en.language.name === `en`,
                  ).name
                }
              </p>
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
            {info.getValue<IEncounter[]>().map((i) =>
              i.condition_values.length > 1 ? (
                <p key={i.chance + i.max_level}>
                  {i.condition_values.map((icv) => (
                    <span key={icv.name}>
                      {
                        filteredEncounter(icv.name).names.find(
                          (en: IName) => en.language.name === `en`,
                        ).name
                      }
                    </span>
                  ))}
                </p>
              ) : i.condition_values.length === 1 ? (
                <p>
                  {
                    filteredEncounter(i.condition_values[0].name).names.find(
                      (en: IName) => en.language.name === `en`,
                    ).name
                  }
                </p>
              ) : (
                <p key={i.min_level + i.max_level}>-</p>
              ),
            )}
          </td>
        ),
      },
    ],
    [filteredEncounter, filteredMethod],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  if (isError) {
    return toast.error(`Something went wrong: ${error?.message}`, {
      style: {
        fontSize: `1.7rem`,
      },
    });
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading name={name} />
      <MainBig>
        <CardTitle>
          {location &&
            removeDash(location.data?.name).replace(
              /kanto|johto|hoenn|sinnoh|unova|kalos|alola|galar|hisui|paldea/g,
              ``,
            )}
        </CardTitle>
        <Subtitle>
          {game && `${location.data?.region.name} - ${removeDash(game)}`}
        </Subtitle>
        <Area
          location={location.data}
          toggleState={toggleState}
          toggleTable={toggleTable}
        />
        <Nav setGame={setGame} setVersion={setVersion} />
        <Section>
          <TableContainer ref={tableContainerRef}>
            <table className={styles.table}>
              {tableHeader()}
              {tableBody()}
              <tfoot>
                <tr>
                  <td colSpan={5}>This area is not present in this game</td>
                </tr>
              </tfoot>
            </table>
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
