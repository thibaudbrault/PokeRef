import { Capitalize } from '@/components/common/styles/Headings';
import { Type } from '@/components/common/styles/Themes';
import { MoveCardDataTable } from '@/components/pages/Moves/MoveCard/Data/Styled.Data.MoveCard';
import { IType } from '@/types/Pokemon/Type';
import { removeDash } from '@/utils/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { TypeDamageSection, TypeDamageTable } from '../Styled.TypeCard';

type Props = {
  type?: IType;
};

function DamageType({ type }: Props) {
  return (
    type && (
      <TypeDamageSection>
        <MoveCardDataTable>
          <tr>
            <th>Generation</th>
            <td>{removeDash(type?.generation.name)}</td>
          </tr>
          <tr>
            <th>Damage class</th>
            <td>
              <Capitalize>{type?.move_damage_class.name}</Capitalize>
            </td>
          </tr>
        </MoveCardDataTable>
        <TypeDamageTable>
          <tr>
            <th>No damage to</th>
            <td>
              <div>
                {type?.damage_relations?.no_damage_to?.map((ndt) => (
                  <Link
                    href={{ pathname: `/type/[name]`, query: { name: ndt?.name } }}
                  >
                    <Image
                      src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${ndt.name}.png`}
                      alt={ndt.name}
                      title={ndt.name}
                      width={32}
                      height={32}
                    />
                  </Link>
                ))}
              </div>
            </td>
          </tr>
          <tr>
            <th>Half damage to</th>
            <td>
              <div>
                {type?.damage_relations?.half_damage_to?.map((hdt) => (
                  <Link
                    href={{ pathname: `/type/[name]`, query: { name: hdt?.name } }}
                  >
                    <Image
                      src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${hdt.name}.png`}
                      alt={hdt.name}
                      title={hdt.name}
                      width={32}
                      height={32}
                    />
                  </Link>
                ))}
              </div>
            </td>
          </tr>
          <tr>
            <th>Double damage to</th>
            <td>
              <div>
                {type?.damage_relations?.double_damage_to?.map((ddt) => (
                  <Link
                    href={{ pathname: `/type/[name]`, query: { name: ddt?.name } }}
                  >
                    <Image
                      src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${ddt.name}.png`}
                      alt={ddt.name}
                      title={ddt.name}
                      width={32}
                      height={32}
                    />
                  </Link>
                ))}
              </div>
            </td>
          </tr>
          <tr>
            <th>No damage from</th>
            <td>
              <div>
                {type?.damage_relations?.no_damage_from?.map((ndf) => (
                  <Link
                    href={{ pathname: `/type/[name]`, query: { name: ndf?.name } }}
                  >
                    <Image
                      src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${ndf.name}.png`}
                      alt={ndf.name}
                      title={ndf.name}
                      width={32}
                      height={32}
                    />
                  </Link>
                ))}
              </div>
            </td>
          </tr>
          <tr>
            <th>Half damage from</th>
            <td>
              <div>
                {type?.damage_relations?.half_damage_from?.map((hdf) => (
                  <Link
                    href={{ pathname: `/type/[name]`, query: { name: hdf?.name } }}
                  >
                    <Image
                      src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${hdf.name}.png`}
                      alt={hdf.name}
                      title={hdf.name}
                      width={32}
                      height={32}
                    />
                  </Link>
                ))}
              </div>
            </td>
          </tr>
          <tr>
            <th>Double damage from</th>
            <td>
              <div>
                {type?.damage_relations?.double_damage_from?.map((ddf) => (
                  <Link
                    href={{ pathname: `/type/[name]`, query: { name: ddf?.name } }}
                  >
                    <Image
                      src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${ddf.name}.png`}
                      alt={ddf.name}
                      title={ddf.name}
                      width={32}
                      height={32}
                    />
                  </Link>
                ))}
              </div>
            </td>
          </tr>
        </TypeDamageTable>
      </TypeDamageSection>
    )
  );
}

export default DamageType;
