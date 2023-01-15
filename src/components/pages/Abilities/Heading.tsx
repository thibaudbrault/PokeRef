import React from 'react';
import Head from 'next/head';

function HeadingAbilities() {
  return (
    <Head>
      <title>Abilities | Pokeref</title>
      <meta
        name="description"
        content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
      />
      <meta property="og:title" content="Abilities | Pokeref" />
      <meta
        property="og:description"
        content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
      />
      <meta property="og:url" content="https://pokeref.app/abilities" />
      <meta property="og:type" content="website" />
    </Head>
  );
}

export default HeadingAbilities;
