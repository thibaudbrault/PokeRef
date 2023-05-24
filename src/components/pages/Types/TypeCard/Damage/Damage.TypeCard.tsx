import { Capitalize } from '@/components/common/styles/Headings';
import ToolTip from '@/components/common/ui/ToolTip';
import { MoveCardDataTable } from '@/components/pages/Moves/MoveCard/Data/Styled.Data.MoveCard';
import { IType } from '@/types/Pokemon/Type';
import { capitalize, removeDash } from '@/utils/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { TypeDamageSection, TypeDamageTable } from '../Styled.TypeCard';

type Props = {
  type?: IType;
};

function DamageType({ type }: Props) {
  return (
    type && (
      <>
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
              <th>Deals 0X damage to</th>
              <td>
                <div>
                  {type?.damage_relations?.no_damage_to?.map((ndt) => (
                    <Link
                      key={ndt.name}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(ndt.name)}
                      href={{
                        pathname: `/type/[name]`,
                        query: { name: ndt?.name },
                      }}
                    >
                      <Image
                        src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${ndt.name}.png`}
                        alt={ndt.name}
                        width={32}
                        height={32}
                      />
                    </Link>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <th>Deals 1/2X damage to</th>
              <td>
                <div>
                  {type?.damage_relations?.half_damage_to?.map((hdt) => (
                    <Link
                      key={hdt.name}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(hdt.name)}
                      href={{
                        pathname: `/type/[name]`,
                        query: { name: hdt?.name },
                      }}
                    >
                      <Image
                        src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${hdt.name}.png`}
                        alt={hdt.name}
                        width={32}
                        height={32}
                      />
                    </Link>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <th>Deals 2X damage to</th>
              <td>
                <div>
                  {type?.damage_relations?.double_damage_to?.map((ddt) => (
                    <Link
                      key={ddt.name}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(ddt.name)}
                      href={{
                        pathname: `/type/[name]`,
                        query: { name: ddt?.name },
                      }}
                    >
                      <Image
                        src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${ddt.name}.png`}
                        alt={ddt.name}
                        width={32}
                        height={32}
                      />
                    </Link>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <th>Takes 0X damage from</th>
              <td>
                <div>
                  {type?.damage_relations?.no_damage_from?.map((ndf) => (
                    <Link
                      key={ndf.name}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(ndf.name)}
                      href={{
                        pathname: `/type/[name]`,
                        query: { name: ndf?.name },
                      }}
                    >
                      <Image
                        src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${ndf.name}.png`}
                        alt={ndf.name}
                        width={32}
                        height={32}
                      />
                    </Link>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <th>Takes 1/2X damage from</th>
              <td>
                <div>
                  {type?.damage_relations?.half_damage_from?.map((hdf) => (
                    <Link
                      key={hdf.name}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(hdf.name)}
                      href={{
                        pathname: `/type/[name]`,
                        query: { name: hdf?.name },
                      }}
                    >
                      <Image
                        src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${hdf.name}.png`}
                        alt={hdf.name}
                        width={32}
                        height={32}
                      />
                    </Link>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <th>Takes 2X damage from</th>
              <td>
                <div>
                  {type?.damage_relations?.double_damage_from?.map((ddf) => (
                    <Link
                      key={ddf.name}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(ddf.name)}
                      href={{
                        pathname: `/type/[name]`,
                        query: { name: ddf?.name },
                      }}
                    >
                      <Image
                        src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${ddf.name}.png`}
                        alt={ddf.name}
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
        <ToolTip id="type-tooltip" />
      </>
    )
  );
}

export default DamageType;
