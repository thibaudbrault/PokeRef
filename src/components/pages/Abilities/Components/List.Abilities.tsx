import React from 'react';
import { TEffect, TLink, TName, TRow } from '@/components/common/styles/Table';
import { Abilities } from '@/types/types';

type Props = {
  filterAbilities?: Abilities.Abilities[];
  filterEffect?: Abilities.FlavorText[];
};

function ListAbilities({ filterAbilities, filterEffect }: Props) {
  return (
    <>
      {filterAbilities
        ?.sort((a, b) => a.name.localeCompare(b.name))
        ?.map((a, i) => (
          <TRow key={a.name}>
            <TName>
              <TLink
                href={{
                  pathname: `/ability/[name]`,
                  query: { name: a?.name },
                }}
              >
                {a.name.replace(/-/g, ` `)}
              </TLink>
            </TName>
            <TEffect>
              <span>{filterEffect?.[i]?.flavor_text}</span>
            </TEffect>
          </TRow>
        ))}
    </>
  );
}

export default ListAbilities;
