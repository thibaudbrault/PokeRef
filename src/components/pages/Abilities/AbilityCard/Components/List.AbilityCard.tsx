import React from 'react';
import Image from 'next/image';
import { TRow, TName, TLink } from '@/components/common/styles/Table';
import { Abilities, Pokemon } from '@/types/types';
import DataAbilityCard from './Data.AbilityCard';
import ImageWithFallback from '@/utils/ImageWithFallback';

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
                  <ImageWithFallback
                    key={p.name}
                    src={p.sprites.front_default || ``}
                    alt="-"
                    loading="lazy"
                    width={64}
                    height={64}
                    fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
                  />
                  <TLink
                    href={{
                      pathname: `/pokemon/[name]`,
                      query: { name: ap.pokemon.name },
                    }}
                    key={ap.pokemon.name}
                  >
                    {ap.pokemon.name.replace(/-/g, ` `)}
                  </TLink>
                </td>
                <DataAbilityCard p={p} ability={ability} />
              </TRow>
            ),
        ),
      )}
    </>
  );
}

export default ListAbilityCard;
