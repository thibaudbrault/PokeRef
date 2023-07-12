import { removeDash } from '@/utils';

import type { IAbilityFlavorText } from '@/types';

type Props = {
  filterDesc?: IAbilityFlavorText[];
};

export function Description({ filterDesc }: Props) {
  return (
    <section className="sectionTop">
      <h3 className="h3">Game descriptions</h3>
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
