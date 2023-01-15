import React from 'react';
import Head from 'next/head';

function HeadingTypes() {
  return (
    <Head>
      <title>Types | Pokeref</title>
      <meta
        name="description"
        content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
      />
      <meta property="og:title" content="Types | Pokeref" />
      <meta
        property="og:description"
        content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
      />
      <meta property="og:url" content="https://pokeref.app/types" />
      <meta property="og:type" content="website" />
    </Head>
  );
}

export default HeadingTypes;
