import React, { useState } from 'react';
import {
  PokedexElement,
  PokedexList,
  PokedexTypes,
  PokedexVerticalText,
  ToBottom,
} from '../components/pages/Pokemon/Styled.Pokemon';
import { MainBig } from '../components/CommonStyles/Sizing';
import { Type } from '../components/CommonStyles/Themes';
import { usePokedex } from '../hooks/DataFetch';
import Loader from '../components/ui/Loader/Loader';
import { FaAngleDown } from '@meronex/icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Pokemon } from '@/types/types';
import Head from 'next/head';

const Filters = dynamic(
  () => import(`../components/pages/Pokemon/Components/Filters.Pokemon`),
);
const Sprites = dynamic(
  () => import(`../components/pages/Pokemon/Components/Sprites.Pokemon`),
);

function Pokedex() {
  // Modify the first pokemon displayed
  const [offset, setOffset] = useState<number>(0);
  //Modify the max number of pokemon displayed
  const [limit, setLimit] = useState<number>(905);
  // Form of the pokemon (changed with a dropdown)
  const [form, setForm] = useState<string>(`default`);
  // Type of the pokemon (changed with a dropdown)
  const [type, setType] = useState<string>(`all`);
  // Generation of the pokemon (changed with a dropdown)
  const [generation, setGeneration] = useState<string>(`all`);

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
            {pokedex?.map((p: Pokemon.Pokemon) => (
              <PokedexElement key={p.id}>
                <Sprites p={p} />
                {p.id < 905 && <p>#{p.id.toString().padStart(3, `0`)}</p>}
                <h2 data-testid="pokemonName">
                  <Link
                    href={{
                      pathname: `/pokemon/[name]`,
                      query: { name: p.name },
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
                  {p.types.map((pt) => (
                    <Type id={pt.type.name} key={pt.type.name}>
                      <Link
                        href={{
                          pathname: `/type/[name]`,
                          query: { name: pt.type.name },
                        }}
                      >
                        <Image alt={pt.type.name} />
                        <span>{pt.type.name}</span>
                      </Link>
                    </Type>
                  ))}
                </PokedexTypes>
              </PokedexElement>
            ))}
          </ul>
        </PokedexList>
        <ToBottom href="#footer" aria-label="To Bottom">
          <FaAngleDown />
        </ToBottom>
      </MainBig>
    </>
  );
}

export default Pokedex;
