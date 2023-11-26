import { useCallback, useMemo } from 'react';

import { FaChevronLeft } from '@meronex/icons/fa';
import * as Tabs from '@radix-ui/react-tabs';
import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { Button, errorToast, GenNav, Loader } from '@/components';
import { useTableParams } from '@/hooks';
import { Heading, useSwitchGame } from '@/modules/locations/location';
import styles from '@/modules/locations/Locations.module.scss';
import { removeDash } from '@/utils';

import type {
  IEncounter,
  IEncounterConditionValue,
  IEncounterMethod,
  IName,
  INamedApiResource,
  IPokemonEncounter,
} from '@/types';

function LocationCard() {
  const router = useRouter();
  const name = router.query.name as string;

  const {
    game,
    setGame,
    toggle,
    setToggle,
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
      return encounter?.find(
        (e: IEncounterConditionValue) => e.name === condition,
      );
    },
    [encounter],
  );

  const filteredEncounterMemoized = useMemo(
    () => filteredEncounter,
    [filteredEncounter],
  );

  const filteredMethod = useCallback(
    (condition: string) => {
      return method?.find((m: IEncounterMethod) => m.name === condition);
    },
    [method],
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
      <Tabs.Root className="TabsRootMain" defaultValue={String(toggle)}>
        <section className={styles.title}>
          <h2 className="title">
            {location &&
              removeDash(location?.name).replace(
                /kanto|johto|hoenn|sinnoh|unova|kalos|alola|galar|hisui|paldea/g,
                ``,
              )}
          </h2>
          <h4 className="subtitle">
            {game && `${location?.region.name} - ${removeDash(game)}`}
          </h4>
        </section>
        <Tabs.List className="TabsList">
          {location?.areas.map((la: INamedApiResource, i: number) => (
            <Tabs.Trigger
              key={i}
              className="TabsTrigger"
              value={String(i)}
              onClick={() => setToggle(i)}
            >
              {removeDash(la.name)
                .replace(/kanto|johto|hoenn|sinnoh|unova|kalos|alola/, ``)
                .replace(/area/, ``)}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <GenNav setGame={setGame} />
        <Tabs.Content value={String(toggle)}>
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
        </Tabs.Content>
        <Button intent="back" size="fit" asChild>
          <Link href="/locations">
            <FaChevronLeft />
            Back to Locations
          </Link>
        </Button>
      </Tabs.Root>
    </>
  );
}

export default LocationCard;
