import React from 'react';
import Link from 'next/link';
import { PokedexElement, PokedexTypes } from '../Styled.Pokemon';
import { Pokemon } from '@/types/types';
import dynamic from 'next/dynamic';

const Sprites = dynamic(
  () => import(`@/components/pages/Pokemon/Components/Sprites.Pokemon`),
);
const TypesPokemon = dynamic(
  () => import(`@/components/pages/Pokemon/Components/Types.Pokemon`),
);

type Props = {
  filteredPokedex: Pokemon.Pokemon[];
};

function ListPokemon({ filteredPokedex }: Props) {
  return (
    <ul>
      {filteredPokedex?.map((p: Pokemon.Pokemon) => (
        <PokedexElement key={p.id}>
          <Sprites p={p} />
          {p.id < 1008 && <p>#{p.id.toString().padStart(3, `0`)}</p>}
          <h2 data-testid="pokemonName">
            <Link
              href={{
                pathname: `/pokemon/[name]`,
                query: { name: p?.name },
              }}
              key={p.name}
            >
              {p.name
                .replace(/-/g, ` `)
                .replace(`single strike`, ``)
                .replace(`rapid strike`, ``)
                .replace(`red meteor`, ``)}
            </Link>
          </h2>
          <PokedexTypes>
            <TypesPokemon p={p} />
          </PokedexTypes>
        </PokedexElement>
      ))}
      ;
    </ul>
  );
}

export default ListPokemon;
