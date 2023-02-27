import { H3 } from '@/components/common/styles/Headings';
import { IAbilityFlavorText } from '@/types/Pokemon/Ability';
import { removeDash } from '@/utils/Typography';
import { AbilityCardSection, AbilityCardTable } from '../Styled.AbilityCard';

type Props = {
  filterDesc?: IAbilityFlavorText[];
};

function DescAbilityCard({ filterDesc }: Props) {
  return (
    <AbilityCardSection>
      <H3>Game descriptions</H3>
      <AbilityCardTable>
        <tbody>
          {filterDesc?.map((fd) => (
            <tr key={fd.flavor_text}>
              <th>{removeDash(fd?.version_group.name)}</th>
              <td>{fd?.flavor_text}</td>
            </tr>
          ))}
        </tbody>
      </AbilityCardTable>
    </AbilityCardSection>
  );
}

export default DescAbilityCard;
