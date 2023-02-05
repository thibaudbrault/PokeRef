import React from 'react';
import Image from 'next/image';
import { H3, Span } from '@/components/common/styles/Headings';
import { Section } from '@/components/common/styles/Sizing';
import { TypeListSubtitle, TypePokemonList } from '../Styled.TypeCard';
import Link from 'next/link';
import { Types } from '@/types/types';
import { IPokemon } from '@/types/Pokemon/Pokemon';

type Props = {
  type?: Types.Types;
  pokedex?: IPokemon[];
};

function PokemonType({ type, pokedex }: Props) {
  // Returns the number of pokemon with this type
  const nbPokemon = document.querySelectorAll(`.pokemonElement`).length;

  return (
    <Section>
      <H3>Pokémon</H3>
      {nbPokemon &&
        <TypeListSubtitle>
          {nbPokemon} Pokémon are <Span>{type?.name}</Span> type
        </TypeListSubtitle>
      }
      <TypePokemonList>
        {type?.pokemon?.map((tp) =>
          pokedex?.map(
            (p) =>
              p.name === tp.pokemon.name &&
              p.id < 1008 && (
                <li key={p.name} className="pokemonElement">
                  <Image
                    src={p.sprites.front_default}
                    alt={p.name}
                    width={96}
                    height={96}
                    loading="lazy"
                  />
                  <p>#{p?.id}</p>
                  <Link
                    href={{
                      pathname: `/pokemon/[name]`,
                      query: { name: p.name },
                    }}
                  >
                    {tp?.pokemon?.name?.replace(/-/g, ` `)}
                  </Link>
                </li>
              ),
          ),
        )}
      </TypePokemonList>
    </Section>
  );
}

export default PokemonType;
