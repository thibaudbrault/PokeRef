import { H3 } from '@/components/common/styles/Headings';
import { Section } from '@/components/common/styles/Sizing';
import { TableContainer, TBold } from '@/components/common/styles/Table';
import { LocationTable } from '@/components/pages/Locations/Styled.Locations';
import { useTableParams } from '@/hooks/useTableParams';
import { ILocationAreaEncounter } from '@/types/Pokemon/Pokemon';
import { IEncounter } from '@/types/Utility/CommonModels';
import { removeDash } from '@/utils/Typography';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

type Props = {
  location: ILocationAreaEncounter[];
  game: string;
};

function Locations({ location, game }: Props) {
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

  const data = useMemo(() => filteredLocation, [location, game]);

  const columns = useMemo<ColumnDef<ILocationAreaEncounter>[]>(
    () => [
      {
        accessorKey: 'location_area.name',
        id: 'sort',
        header: 'Location',
        cell: (info) => (
          <TBold>
            {removeDash(info.getValue<string>()).replace(
              /kanto|johto|hoenn|sinnoh|unova|kalos|alola|galar|hisui|paldea|area|sea/g,
              ``,
            )}
          </TBold>
        ),
      },
      {
        accessorFn: (row) => row.version_details[0].encounter_details,
        id: 'level',
        header: 'Level',
        cell: (info) => (
          <td>
            {info.getValue<IEncounter[]>().map((i) => (
              <p>{i.max_level}</p>
            ))}
          </td>
        ),
      },
      {
        accessorFn: (row) => row.version_details[0].encounter_details,
        id: 'chance',
        header: 'Probability',
        cell: (info) => (
          <td>
            {info.getValue<IEncounter[]>().map((i) => (
              <p>{i.chance} %</p>
            ))}
          </td>
        ),
      },
      {
        accessorFn: (row) => row.version_details[0].encounter_details,
        id: 'method',
        header: 'Method',
        cell: (info) => (
          <td>
            {info.getValue<IEncounter[]>().map((i) => (
              <p>{removeDash(i.method.name)}</p>
            ))}
          </td>
        ),
      },
      {
        accessorFn: (row) => row.version_details[0].encounter_details,
        id: 'condition',
        header: 'Condition',
        cell: (info) => (
          <td>
            {info
              .getValue<IEncounter[]>()
              .map((i) =>
                i.condition_values.length > 0 ? (
                  i.condition_values.map((icv) => <p>{removeDash(icv.name)}</p>)
                ) : (
                  <p>-</p>
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
    <Section>
      <H3>Locations</H3>
      <TableContainer ref={tableContainerRef}>
        <LocationTable>
          {tableHeader()}
          {tableBody()}
          <tfoot>
            <tr>
              <td colSpan={5}>This pokémon is not present in this game</td>
            </tr>
          </tfoot>
        </LocationTable>
      </TableContainer>
    </Section>
  );
}

export default Locations;
