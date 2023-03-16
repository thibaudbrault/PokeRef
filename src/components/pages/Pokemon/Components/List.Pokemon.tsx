import { auth } from '@/firebase-config';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { removeDash } from '@/utils/Typography';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  FavoritesBtn,
  PokedexElement,
  PokedexList,
  PokedexTypes,
} from '../Styled.Pokemon';
import { EnHeart } from '@meronex/icons/en/';

interface ITypesProps {
  p: IPokemon;
}

const Sprites = dynamic(
  () => import(`@/components/pages/Pokemon/Components/Sprites.Pokemon`),
);
const TypesPokemon = dynamic<ITypesProps>(
  () => import(`@/components/pages/Pokemon/Components/Types.Pokemon`) as any,
);

type Props = {
  filteredPokedex: IPokemon[];
};

function ListPokemon({ filteredPokedex }: Props) {
  const [fav, setFav] = useState<string[]>([]);

  const favHandler = (name: string) => {
    if (fav.includes(name)) {
      setFav(fav.filter((fav) => fav !== name));
    } else {
      setFav([...fav, name]);
    }
  };

  return (
    <PokedexList>
      {filteredPokedex?.map((p: IPokemon) => (
        <PokedexElement key={p.id}>
          {!auth.currentUser && (
            <FavoritesBtn
              className={fav.find((fav) => fav === p.name) ? 'favorited' : ''}
              onClick={() => favHandler(p.name)}
            >
              <EnHeart />
            </FavoritesBtn>
          )}
          <Sprites p={p} />
          {p.id < 1011 && <p>#{p.id.toString().padStart(3, `0`)}</p>}
          <h2 data-testid="pokemonName">
            <Link
              href={{
                pathname: `/pokemon/[name]`,
                query: { name: p?.name },
              }}
              key={p.name}
            >
              {removeDash(p.name)
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
    </PokedexList>
  );
}

export default ListPokemon;
