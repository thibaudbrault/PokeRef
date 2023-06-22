import { H3 } from '@/components/common/styles/Headings';
import { IAbilityFlavorText } from '@/types';
import { removeDash } from '@/utils';

type Props = {
  filterDesc?: IAbilityFlavorText[];
};

export function Description({ filterDesc }: Props) {
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
