import React, { useState, useEffect } from 'react';
import {
  PokedexElement,
  PokedexList,
  PokedexTypes,
  PokedexVerticalText,
  ToBottom,
} from '@/components/pages/Pokemon/Styled.Pokemon';
import { MainBig } from '@/components/common/styles/Sizing';
import { Type } from '@/components/common/styles/Themes';
import { usePokedex } from '@/hooks/DataFetch';
import Loader from '@/components/common/ui/Loader/Loader';
import { FaAngleDown, FaAngleUp } from '@meronex/icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Pokemon } from '@/types/types';
import Head from 'next/head';
import { useStateWithCallback } from '@/hooks/useStateWithCallback';
import { Options, OptionsOffsetLimit } from '@/utils/DataArrays';

const Filters = dynamic(
  () => import(`../components/pages/Pokemon/Components/Filters.Pokemon`),
);
const Sprites = dynamic(
  () => import(`../components/pages/Pokemon/Components/Sprites.Pokemon`),
);

function Pokedex() {
  const [filteredPokedex, setFilteredPokedex] = useState<Pokemon.Pokemon[]>([]);
  // Modify the first pokemon displayed
  const [offset, setOffset] = useState<number>(0);
  //Modify the max number of pokemon displayed
  const [limit, setLimit] = useState<number>(905);
  // Form of the pokemon (changed with a dropdown)
  const [form, setForm] = useStateWithCallback<OptionsOffsetLimit | null>(null);
  // Type of the pokemon (changed with a dropdown)
  const [type, setType] = useStateWithCallback<Options[]>([]);
  // Generation of the pokemon (changed with a dropdown)
  const [generation, setGeneration] =
    useStateWithCallback<OptionsOffsetLimit | null>(null);

  const [scrollDir, setScrollDir] = useState(`down`);
  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? `down` : `up`);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener(`scroll`, onScroll);
    return () => window.removeEventListener(`scroll`, onScroll);
  }, [scrollDir]);

  const {
    isLoading,
    error,
    data: pokedex,
  } = usePokedex(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  );

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
        />
        <meta property="og:title" content="Pokeref | A pokemon encyclopedia" />
        <meta
          property="og:description"
          content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
        />
        <meta property="og:url" content="https://pokeref.app/" />
        <meta property="og:type" content="website" />
        <title>Pokeref | A pokemon encyclopedia</title>
      </Head>
      <MainBig>
        <Filters
          pokedex={pokedex}
          setFilteredPokedex={setFilteredPokedex}
          setOffset={setOffset}
          setLimit={setLimit}
          form={form}
          setForm={setForm}
          type={type}
          setType={setType}
          generation={generation}
          setGeneration={setGeneration}
        />
        <PokedexVerticalText>ポケモン</PokedexVerticalText>
        <PokedexList>
          <ul>
            {filteredPokedex?.map((p: Pokemon.Pokemon) => (
              <PokedexElement key={p.id}>
                <Sprites p={p} />
                {p.id < 905 && <p>#{p.id.toString().padStart(3, `0`)}</p>}
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
                  {p.types?.map((pt) => (
                    <Type id={pt.type.name} key={pt.type.name}>
                      <Link
                        href={{
                          pathname: `/type/[name]`,
                          query: { name: pt.type.name },
                        }}
                      >
                        <Image alt={pt.type.name} src={``} />
                        <span>{pt.type.name}</span>
                      </Link>
                    </Type>
                  ))}
                </PokedexTypes>
              </PokedexElement>
            ))}
          </ul>
        </PokedexList>
        {scrollDir === `down` ? (
          <ToBottom href="#footer" aria-label="To Bottom">
            <FaAngleDown />
          </ToBottom>
        ) : (
          <ToBottom href="#header" aria-label="To Top">
            <FaAngleUp />
          </ToBottom>
        )}
      </MainBig>
    </>
  );
}

export default Pokedex;
