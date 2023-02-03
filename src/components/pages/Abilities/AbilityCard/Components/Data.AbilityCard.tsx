import React from 'react';
import { TLink } from '@/components/common/styles/Table';
import { Abilities, Pokemon } from '@/types/types';
import { IPokemon } from '@/types/Pokemon/Pokemon';

type Props = {
  p: IPokemon;
  ability: Abilities.Abilities;
};

function DataAbilityCard({ p, ability }: Props) {
  return (
    <>
      {Array(3)
        .fill(true)
        .map((_, i) => (
          <td key={i}>
            {p?.abilities.length > i ? (
              <TLink
                key={p.abilities?.[i].ability.name}
                href={{
                  pathname: `/ability/[name]`,
                  query: { name: p?.abilities?.[i].ability.name },
                }}
                className={
                  p.abilities?.[i].ability.name === ability.name ? `bold` : ``
                }
              >
                {p.abilities?.[i].ability.name.replace(/-/g, ` `)}
              </TLink>
            ) : (
              `-`
            )}
          </td>
        ))}
    </>
  );
}

export default DataAbilityCard;
