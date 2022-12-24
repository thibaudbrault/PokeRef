import React, { useEffect, useState } from 'react';
import { MainBig } from '@/components/common/styles/Sizing';
import { Pokemon } from '@/types/types';
import {
  PokedexElement,
  PokedexList,
  PokedexTypes,
} from '@/components/pages/Pokemon/Styled.Pokemon';
import Link from 'next/link';
import { Type } from '@/components/common/styles/Themes';
import Image from 'next/image';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem(`pokemon`) || `[]`);
    if (favorites) {
      setFavorites(favorites);
    }
  }, [reload]);

  const handleClick = () => {
    localStorage.removeItem(`pokemon`);
    setReload(!reload);
  };

  return (
    <MainBig>
      {favorites.length > 0 ? (
        <>
          <button onClick={handleClick}>Release all</button>
          <PokedexList>
            <ul>
              {favorites.map((f: Pokemon.Pokemon) => (
                <PokedexElement key={f.id}>
                  <Image
                    src={f?.sprites.front_default}
                    alt={f.name}
                    width={96}
                    height={96}
                  />
                  <h2 data-testid="pokemonName">
                    <Link
                      href={{
                        pathname: `/pokemon/[name]`,
                        query: { name: f?.name },
                      }}
                      key={f.name}
                    >
                      {f.name
                        .replace(/-/g, ` `)
                        .replace(`single strike`, ``)
                        .replace(`rapid strike`, ``)
                        .replace(`red meteor`, ``)}
                    </Link>
                  </h2>
                  <PokedexTypes>
                    {f.types?.map((ft) => (
                      <Type id={ft.type.name} key={ft.type.name}>
                        <Link
                          href={{
                            pathname: `/type/[name]`,
                            query: { name: ft.type.name },
                          }}
                        >
                          <Image alt={ft.type.name} />
                          <span>{ft.type.name}</span>
                        </Link>
                      </Type>
                    ))}
                  </PokedexTypes>
                </PokedexElement>
              ))}
            </ul>
          </PokedexList>
        </>
      ) : (
        <p>You should catch pokemon</p>
      )}
    </MainBig>
  );
}

export default Favorites;
