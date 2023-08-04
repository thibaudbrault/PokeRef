import { useCallback, useMemo } from 'react';

import { FaChevronLeft } from '@meronex/icons/fa';
import { type ColumnDef } from '@tanstack/react-table';
import { type GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import { Button, errorToast, GenNav, Loader } from '@/components';
import { useTableParams } from '@/hooks';
import { Area, Heading, useSwitchGame } from '@/modules/locations/location';
import styles from '@/modules/locations/Locations.module.scss';
import { removeDash } from '@/utils';

import type {
  IEncounter,
  IEncounterConditionValue,
  IEncounterMethod,
  IName,
  IPokemonEncounter,
} from '@/types';

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

  const filteredArea = useMemo(() => {
    return area?.pokemon_encounters
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
  }, [area, game]);

  const filteredEncounter = useCallback(
    (condition: string) => {
      return encounter.data?.find(
        (e: IEncounterConditionValue) => e.name === condition,
      );
    },
    [encounter.data],
  );

  const filteredEncounterMemoized = useMemo(
    () => filteredEncounter,
    [filteredEncounter],
  );

  const filteredMethod = useCallback(
    (condition: string) => {
      return method.data?.find((m: IEncounterMethod) => m.name === condition);
    },
    [method.data],
  );

  const filteredMethodMemoized = useMemo(
    () => filteredMethod,
    [filteredMethod],
  );

  const data = useMemo(() => filteredArea, [filteredArea]);

  const columns = useMemo<ColumnDef<IPokemonEncounter>[]>(
    () => [
      {
        accessorKey: `pokemon.name`,
        id: `sort`,
        header: `Pokemon`,
        cell: (info) => (
          <td className="tBold">
            <Link
              className="tLink"
              href={{
                pathname: `/pokemon/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {removeDash(info.getValue<string>())}
            </Link>
          </td>
        ),
      },
      {
        accessorFn: (row) => row.version_details[0].encounter_details,
        id: `level`,
        header: `Level`,
        cell: (info) => (
          <td>
            {info.getValue<IEncounter[]>().map((i) => (
              <p key={uuidv4()}>{i.max_level}</p>
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
              <p key={uuidv4()}>{i.chance} %</p>
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
              <p key={uuidv4()}>
                {
                  filteredMethodMemoized(i.method.name).names.find(
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
                <p key={uuidv4()}>
                  {i.condition_values.map((icv) => (
                    <span key={uuidv4()}>
                      {
                        filteredEncounterMemoized(icv.name).names.find(
                          (en: IName) => en.language.name === `en`,
                        ).name
                      }
                    </span>
                  ))}
                </p>
              ) : i.condition_values.length === 1 ? (
                <p>
                  {
                    filteredEncounterMemoized(
                      i.condition_values[0].name,
                    ).names.find((en: IName) => en.language.name === `en`).name
                  }
                </p>
              ) : (
                <p key={uuidv4()}>-</p>
              ),
            )}
          </td>
        ),
      },
    ],
    [filteredEncounterMemoized, filteredMethodMemoized],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  if (isError && error instanceof Error) {
    errorToast(error.message);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading name={name} />
      <main className="mainBig">
        <h2 className="pageTitle">
          {location &&
            removeDash(location.data?.name).replace(
              /kanto|johto|hoenn|sinnoh|unova|kalos|alola|galar|hisui|paldea/g,
              ``,
            )}
        </h2>
        <h4 className="subtitle">
          {game && `${location.data?.region.name} - ${removeDash(game)}`}
        </h4>
        <Area
          location={location.data}
          toggleState={toggleState}
          toggleTable={toggleTable}
        />
        <GenNav setGame={setGame} setVersion={setVersion} />
        <section className="section">
          <div className="tableContainer" ref={tableContainerRef}>
            <table className={styles.table}>
              {tableHeader()}
              {tableBody()}
              <tfoot>
                <tr>
                  <td colSpan={5}>This area is not present in this game</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
        <Button intent="back" size="fit" asChild>
          <Link href="/locations">
            <FaChevronLeft />
            Back to Locations
          </Link>
        </Button>
      </main>
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
