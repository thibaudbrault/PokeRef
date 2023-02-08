import { Subtitle } from '@/components/common/styles/Headings';
import { Type } from '@/components/common/styles/Themes';
import { Types } from '@/types/types';
import Image from 'next/image';
import { TypeDamageSection, TypeDamageTable } from '../Styled.TypeCard';

type Props = {
  type?: Types.Types;
};

function DamageType({ type }: Props) {
  return (
    <TypeDamageSection>
      <div>
        <Subtitle>Attack</Subtitle>
        <TypeDamageTable>
          <tr>
            <th>No damage to</th>
            {type?.damage_relations?.no_damage_to?.map((ndt) => (
              <td key={ndt.name}>
                <Type id={ndt.name}>
                  <Image
                    src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${ndt.name}.png`}
                    alt={ndt.name}
                    title={ndt.name}
                    width={32}
                    height={32}
                  />
                </Type>
              </td>
            ))}
          </tr>
          <tr>
            <th>Half damage to</th>
            {type?.damage_relations?.half_damage_to?.map((hdt) => (
              <td key={hdt.name}>
                <Type id={hdt.name}>
                  <Image
                    src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${hdt.name}.png`}
                    alt={hdt.name}
                    title={hdt.name}
                    width={32}
                    height={32}
                  />
                </Type>
              </td>
            ))}
          </tr>
          <tr>
            <th>Double damage to</th>
            {type?.damage_relations?.double_damage_to?.map((ddt) => (
              <td key={ddt.name}>
                <Type id={ddt.name}>
                  <Image
                    src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${ddt.name}.png`}
                    alt={ddt.name}
                    title={ddt.name}
                    width={32}
                    height={32}
                  />
                </Type>
              </td>
            ))}
          </tr>
        </TypeDamageTable>
      </div>
      <div>
        <Subtitle>Defense</Subtitle>
        <TypeDamageTable>
          <tr>
            <th>No damage from</th>
            {type?.damage_relations?.no_damage_from?.map((ndf) => (
              <td key={ndf.name}>
                <Type id={ndf.name}>
                  <Image
                    src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${ndf.name}.png`}
                    alt={ndf.name}
                    title={ndf.name}
                    width={32}
                    height={32}
                  />
                </Type>
              </td>
            ))}
          </tr>
          <tr>
            <th>Half damage from</th>
            {type?.damage_relations?.half_damage_from?.map((hdf) => (
              <td key={hdf.name}>
                <Type id={hdf.name}>
                  <Image
                    src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${hdf.name}.png`}
                    alt={hdf.name}
                    title={hdf.name}
                    width={32}
                    height={32}
                  />
                </Type>
              </td>
            ))}
          </tr>
          <tr>
            <th>Double damage from</th>
            {type?.damage_relations?.double_damage_from?.map((ddf) => (
              <td key={ddf.name}>
                <Type id={ddf.name}>
                  <Image
                    src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${ddf.name}.png`}
                    alt={ddf.name}
                    title={ddf.name}
                    width={32}
                    height={32}
                  />
                </Type>
              </td>
            ))}
          </tr>
        </TypeDamageTable>
      </div>
    </TypeDamageSection>
  );
}

export default DamageType;
