import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Span } from '../../../../Common/Headings';
import { Type } from '../../../../Common/Themes';
import { PokemonDataDesc, PokemonDataTypes } from '../StyledData.PokemonCard';
import { Pokemon, Species } from '@/types/types';

type Props = {
  pokemon: Pokemon.Pokemon;
  species: Species.Species;
  game: string;
};

function Desc({ pokemon, species, game }: Props) {
  return (
    <ul>
      {pokemon.id < 10000 ? (
        <PokemonDataDesc>
          {species.flavor_text_entries.map(
            (sf) =>
              sf.language.name === `en` &&
              sf.version.name === game && (
                <>{sf.flavor_text.replace(`\u000c`, ` `).replace(`é`, `É`)}</>
              ),
          )}
          <p>
            Pokémon{` `}
            <Span>
              <i>{game.replace(/-/g, ` `)}</i>
            </Span>
          </p>
        </PokemonDataDesc>
      ) : null}
      <PokemonDataTypes>
        {pokemon.types.map((pt) => (
          <Type id={pt.type.name} key={pt.type.name}>
            <Link
              href={{ pathname: `/type/[name]`, query: { name: pt.type.name } }}
              passHref
            >
              <a>
                <Image alt={pt.type.name} width={25} height={25} />
                <span>{pt.type.name}</span>
              </a>
            </Link>
          </Type>
        ))}
      </PokemonDataTypes>
    </ul>
  );
}

export default Desc;
