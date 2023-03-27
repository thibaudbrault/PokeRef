import { IPokemonType } from '@/types/Pokemon/Pokemon';
import { IType } from '@/types/Pokemon/Type';
import Image from 'next/image';
import Link from 'next/link';
import { PokemonTypesTable } from '../Styled.Types.PokemonCard';

type Props = {
  target: string;
  pokemonTypes: IPokemonType[];
  types: IType[];
};

function TableTyping({ target, pokemonTypes, types }: Props) {

  console.log(types)

  return (
    <>
      {types.length === 1 && (
        <PokemonTypesTable>
          <tbody>
            <tr>
              <th>0x damage {target}</th>
              <td>
                <div>
                  {target === 'to' ? (
                    types[0].damage_relations.no_damage_to.map((t) =>
                      <Link
                        key={t.name}
                        href={{
                          pathname: `/type/[name]`,
                          query: { name: t.name },
                        }}
                      >
                        <Image
                          src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${t.name}.png`}
                          alt={t.name}
                          title={t.name}
                          width={32}
                          height={32}
                        />
                      </Link>
                    )
                  ) : (
                    types[0].damage_relations.no_damage_from.map((t) =>
                      <Link
                        key={t.name}
                        href={{
                          pathname: `/type/[name]`,
                          query: { name: t.name },
                        }}
                      >
                        <Image
                          src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${t.name}.png`}
                          alt={t.name}
                          title={t.name}
                          width={32}
                          height={32}
                        />
                      </Link>
                    )
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <th>1/4x damage {target}</th>
              <td></td>
            </tr>
            <tr>
              <th>1/2x damage {target}</th>
              <td>
                <div>
                  {target === 'to' ? (
                    types[0].damage_relations.half_damage_to.map((t) =>
                      <Link
                        key={t.name}
                        href={{
                          pathname: `/type/[name]`,
                          query: { name: t.name },
                        }}
                      >
                        <Image
                          src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${t.name}.png`}
                          alt={t.name}
                          title={t.name}
                          width={32}
                          height={32}
                        />
                      </Link>
                    )
                  ) : (
                    types[0].damage_relations.half_damage_from.map((t) =>
                      <Link
                        key={t.name}
                        href={{
                          pathname: `/type/[name]`,
                          query: { name: t.name },
                        }}
                      >
                        <Image
                          src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${t.name}.png`}
                          alt={t.name}
                          title={t.name}
                          width={32}
                          height={32}
                        />
                      </Link>
                    )
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <th>1x damage {target}</th>
              <td></td>
            </tr>
            <tr>
              <th>2x damage {target}</th>
              <td>
                <div>
                  {target === 'to' ? (
                    types[0].damage_relations.double_damage_to.map((t) =>
                      <Link
                        key={t.name}
                        href={{
                          pathname: `/type/[name]`,
                          query: { name: t.name },
                        }}
                      >
                        <Image
                          src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${t.name}.png`}
                          alt={t.name}
                          title={t.name}
                          width={32}
                          height={32}
                        />
                      </Link>
                    )
                  ) : (
                    types[0].damage_relations.double_damage_from.map((t) =>
                      <Link
                        key={t.name}
                        href={{
                          pathname: `/type/[name]`,
                          query: { name: t.name },
                        }}
                      >
                        <Image
                          src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${t.name}.png`}
                          alt={t.name}
                          title={t.name}
                          width={32}
                          height={32}
                        />
                      </Link>
                    )
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <th>4x damage {target}</th>
              <td></td>
            </tr>
          </tbody>
        </PokemonTypesTable>
      )}
      {types.length === 2 && (
        <PokemonTypesTable>
          <tbody>
            <tr>
              <th>0x damage {target}</th>
              <td>
              </td>
            </tr>
            <tr>
              <th>1/4x damage {target}</th>
              <td></td>
            </tr>
            <tr>
              <th>1/2x damage {target}</th>
              <td></td>
            </tr>
            <tr>
              <th>1x damage {target}</th>
              <td></td>
            </tr>
            <tr>
              <th>2x damage {target}</th>
              <td></td>
            </tr>
            <tr>
              <th>4x damage {target}</th>
              <td></td>
            </tr>
          </tbody>
        </PokemonTypesTable>
      )}
    </>
  );
}

export default TableTyping;
