import { IPokemon } from '@/types';
import { removeDash, removeLongName } from '@/utils';
import Link from 'next/link';
import { PokedexElement, PokedexList, PokedexTypes } from '../Styled.Pokemon';
import { Sprites } from './Sprites';
import { Types } from './Types';

type Props = {
  filteredPokedex: IPokemon[];
};

export function List({ filteredPokedex }: Props) {
  return (
    <PokedexList data-test-id="pokemonList">
      {filteredPokedex?.map((p: IPokemon) => (
        <PokedexElement key={p.id} data-test-id="pokemonElement">
          <Sprites p={p} />
          {p.id < 1011 && (
            <p className="number">#{p.id.toString().padStart(3, `0`)}</p>
          )}
          <h2>
            <Link
              href={{
                pathname: `/pokemon/[name]`,
                query: { name: p?.name },
              }}
              key={p.name}
            >
              {removeLongName(removeDash(p.name))}
            </Link>
          </h2>
          <PokedexTypes>
            <Types p={p} />
          </PokedexTypes>
        </PokedexElement>
      ))}
    </PokedexList>
  );
}
