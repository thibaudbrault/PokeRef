import React from 'react';
import { Abilities } from '@/types/types';

type Props = {
  filterDesc?: Abilities.FlavorText[];
};

function DescAbilityCard({ filterDesc }: Props) {
  return (
    <>
      {filterDesc?.map((fd) => (
        <tr key={fd.flavor_text}>
          <th>{fd?.version_group.name.replace(/-/g, ` `)}</th>
          <td>{fd?.flavor_text}</td>
        </tr>
      ))}
    </>
  );
}

export default DescAbilityCard;
