import ToolTip from '@/components/common/ui/ToolTip';
import { IType } from '@/types/Pokemon/Type';
import { capitalize } from '@/utils/Typography';
import Image from 'next/image';
import Link from 'next/link';

import { PokemonTypesTable } from '../Styled.Types.PokemonCard';

type Props = {
  types: IType[];
};

function TableTyping({ types }: Props) {
  return (
    <>
      {types.length === 1 && (
        <PokemonTypesTable>
          <tbody>
            <tr>
              <th>0x damage from</th>
              <td>
                <div>
                  {types[0].damage_relations.no_damage_from.map((t) => (
                    <Link
                      key={t.name}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(t.name)}
                      href={{
                        pathname: `/type/[name]`,
                        query: { name: t.name },
                      }}
                    >
                      <Image
                        src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${t.name}.png`}
                        alt={t.name}
                        width={32}
                        height={32}
                      />
                    </Link>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <th>1/2x damage from</th>
              <td>
                <div>
                  {types[0].damage_relations.half_damage_from.map((t) => (
                    <Link
                      key={t.name}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(t.name)}
                      href={{
                        pathname: `/type/[name]`,
                        query: { name: t.name },
                      }}
                    >
                      <Image
                        src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${t.name}.png`}
                        alt={t.name}
                        width={32}
                        height={32}
                      />
                    </Link>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <th>1x damage from</th>
              <td></td>
            </tr>
            <tr>
              <th>2x damage from</th>
              <td>
                <div>
                  {types[0].damage_relations.double_damage_from.map((t) => (
                    <Link
                      key={t.name}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(t.name)}
                      href={{
                        pathname: `/type/[name]`,
                        query: { name: t.name },
                      }}
                    >
                      <Image
                        src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${t.name}.png`}
                        alt={t.name}
                        width={32}
                        height={32}
                      />
                    </Link>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </PokemonTypesTable>
      )}
      {types.length === 2 && (
        <PokemonTypesTable>
          <tbody>
            <tr>
              <th>0x damage from</th>
              <td></td>
            </tr>
            <tr>
              <th>1/4x damage from</th>
              <td></td>
            </tr>
            <tr>
              <th>1/2x damage from</th>
              <td></td>
            </tr>
            <tr>
              <th>1x damage from</th>
              <td></td>
            </tr>
            <tr>
              <th>2x damage from</th>
              <td></td>
            </tr>
            <tr>
              <th>4x damage from</th>
              <td></td>
            </tr>
          </tbody>
        </PokemonTypesTable>
      )}
      <ToolTip id="type-tooltip" />
    </>
  );
}

export default TableTyping;
