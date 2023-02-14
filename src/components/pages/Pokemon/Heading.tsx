import Head from 'next/head';
import React from 'react';

function HeadingPokemon() {
  return (
    <Head>
      <meta
        name="description"
        content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
      />
      <meta property="og:title" content="Pokeref | Pokemon encyclopedia" />
      <meta
        property="og:description"
        content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
      />
      <meta property="og:url" content="https://pokeref.app/" />
      <meta property="og:type" content="website" />
      <title>Pokeref | Pokemon encyclopedia</title>
    </Head>
  );
}

export default HeadingPokemon;
