import { H3 } from '@/components/common/styles/Headings';
import { IAbilityFlavorText } from '@/types/Pokemon/Ability';
import { removeDash } from '@/utils/Typography';

type Props = {
  filterDesc?: IAbilityFlavorText[];
};

function DescAbilityCard({ filterDesc }: Props) {
  return (
    <section className="sectionTop">
      <H3>Game descriptions</H3>
      <table className="descTable">
        <tbody>
          {filterDesc?.map((fd) => (
            <tr key={fd.flavor_text}>
              <th>{removeDash(fd?.version_group.name)}</th>
              <td>{fd?.flavor_text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default DescAbilityCard;
