import React from 'react';
import Image from 'next/image';
import { TRow, TName, TLink } from '@/components/common/styles/Table';
import { Abilities, Pokemon } from '@/types/types';
import DataAbilityCard from './Data.AbilityCard';

type Props = {
  ability?: Abilities.Abilities;
  pokedex?: Pokemon.Pokemon[];
};

function ListAbilityCard({ ability, pokedex }: Props) {
  return (
    <>
      {ability?.pokemon?.map((ap: Abilities.Pokemon) =>
        pokedex?.map(
          (p) =>
            p.name === ap.pokemon.name && (
              <TRow key={ap.pokemon.name}>
                <td>
                  {p.sprites.front_default ? (
                    <Image
                      key={p.name}
                      src={p.sprites.front_default}
                      alt="-"
                      loading="lazy"
                      width={64}
                      height={64}
                    />
                  ) : (
                    `-`
                  )}
                </td>
                <TName>
                  <TLink
                    href={{
                      pathname: `/pokemon/[name]`,
                      query: { name: ap.pokemon.name },
                    }}
                    key={ap.pokemon.name}
                  >
                    {ap.pokemon.name.replace(/-/g, ` `)}
                  </TLink>
                </TName>
                <DataAbilityCard p={p} ability={ability} />
              </TRow>
            ),
        ),
      )}
    </>
  );
}

export default ListAbilityCard;
