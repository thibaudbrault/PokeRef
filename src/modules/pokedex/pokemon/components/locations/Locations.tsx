import { useTableParams } from '@/hooks';
import styles from '@/modules/locations/Locations.module.scss';
import { IEncounter, ILocationAreaEncounter } from '@/types';
import { removeDash } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

type Props = {
  location: ILocationAreaEncounter[];
  game: string;
};

export function Locations({ location, game }: Props) {
  const filteredLocation = location
    .map((l) => {
      const version_details = l.version_details.filter(
        (lv) => lv.version.name === game,
      );
      return {
        ...l,
        version_details,
      };
    })
    .filter((l) => l.version_details.length);

  //eslint-disable-next-line react-hooks/exhaustive-deps
  const data = useMemo(() => filteredLocation, [location, game]);

  const columns = useMemo<ColumnDef<ILocationAreaEncounter>[]>(
    () => [
      {
        accessorKey: `location_area.name`,
        id: `sort`,
        header: `Location`,
        cell: (info) => (
          <td className="tBold">
            {removeDash(info.getValue<string>()).replace(
              /kanto|johto|hoenn|sinnoh|unova|kalos|alola|galar|hisui|paldea|area|sea/g,
              ``,
            )}
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

  return (
    <section className="section" id="locations">
      <h3 className="h3">Locations</h3>
      <div className="tableContainer" ref={tableContainerRef}>
        <table className={styles.table}>
          {tableHeader()}
          {tableBody()}
          <tfoot>
            <tr>
              <td colSpan={5}>Not present or not found in nature</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
