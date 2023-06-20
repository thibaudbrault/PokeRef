import { Capitalize } from '@/components/common/styles/Headings';
import ToolTip from '@/components/common/ui/ToolTip';
import { MoveCardDataTable } from '@/components/pages/Moves/MoveCard/Data/Styled.Data.MoveCard';
import { IType } from '@/types/Pokemon/Type';
import { capitalize, removeDash } from '@/utils/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { TypeDamageSection, TypeDamageTable } from '../Styled.TypeCard';
import typesRelationData from '@/data/types.json';

type Props = {
  type?: IType;
};

type TypesRelation = {
  [key: string]: Record<string, number>;
};

function DamageType({ type }: Props) {
  const typesRelation: TypesRelation = typesRelationData;
  const name = type?.name || ``;
  const typeEffectiveness: Record<string, number> = typesRelation[name];

  const getTypeEffectiveness = (multiplier: number) => {
    return Object.entries(typeEffectiveness)
      .filter(([key, value]) => value === multiplier)
      .map(([key]) => key);
  };

  const getTypeWeaknessess = (multiplier: number) => {
    const typeData: { key: string; value: number }[] = [];
    for (const [key, objValue] of Object.entries(typesRelation)) {
      const value = objValue[name];
      if (typeof value === `number`) {
        typeData.push({
          key,
          value,
        });
      }
    }
    return typeData
      .filter((type) => type.value === multiplier)
      .map((filteredType) => filteredType.key);
  };

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
                  {getTypeEffectiveness(0).map((type) => (
                    <Link
                      key={type}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(type)}
                      href={{
                        pathname: `/type/[name]`,
                        query: { name: type },
                      }}
                    >
                      <Image
                        src={`/images/types/${type}.png`}
                        alt={type}
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
                  {getTypeEffectiveness(0.5).map((type) => (
                    <Link
                      key={type}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(type)}
                      href={{
                        pathname: `/type/[name]`,
                        query: { name: type },
                      }}
                    >
                      <Image
                        src={`/images/types/${type}.png`}
                        alt={type}
                        width={32}
                        height={32}
                      />
                    </Link>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <th>Deals 1X damage to</th>
              <td>
                <div>
                  {getTypeEffectiveness(1).map((type) => (
                    <Link
                      key={type}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(type)}
                      href={{
                        pathname: `/type/[name]`,
                        query: { name: type },
                      }}
                    >
                      <Image
                        src={`/images/types/${type}.png`}
                        alt={type}
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
                  {getTypeEffectiveness(2).map((type) => (
                    <Link
                      key={type}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(type)}
                      href={{
                        pathname: `/type/[name]`,
                        query: { name: type },
                      }}
                    >
                      <Image
                        src={`/images/types/${type}.png`}
                        alt={type}
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
                  {getTypeWeaknessess(0).map((type) => (
                    <Link
                      key={type}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(type)}
                      href={{
                        pathname: `/type/[name]`,
                        query: { name: type },
                      }}
                    >
                      <Image
                        src={`/images/types/${type}.png`}
                        alt={type}
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
                  {getTypeWeaknessess(0.5).map((type) => (
                    <Link
                      key={type}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(type)}
                      href={{
                        pathname: `/type/[name]`,
                        query: { name: type },
                      }}
                    >
                      <Image
                        src={`/images/types/${type}.png`}
                        alt={type}
                        width={32}
                        height={32}
                      />
                    </Link>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <th>Takes 1X damage from</th>
              <td>
                <div>
                  {getTypeWeaknessess(1).map((type) => (
                    <Link
                      key={type}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(type)}
                      href={{
                        pathname: `/type/[name]`,
                        query: { name: type },
                      }}
                    >
                      <Image
                        src={`/images/types/${type}.png`}
                        alt={type}
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
                  {getTypeWeaknessess(2).map((type) => (
                    <Link
                      key={type}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(type)}
                      href={{
                        pathname: `/type/[name]`,
                        query: { name: type },
                      }}
                    >
                      <Image
                        src={`/images/types/${type}.png`}
                        alt={type}
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
