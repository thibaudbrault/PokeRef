import Head from 'next/head';
import React from 'react';

function HeadingItems() {
  return (
    <Head>
      <title>Items | Pokeref</title>
      <meta
        name="description"
        content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
      />
      <meta property="og:title" content="Items | Pokeref" />
      <meta
        property="og:description"
        content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
      />
      <meta property="og:url" content="https://pokeref.app/items" />
      <meta property="og:type" content="website" />
    </Head>
  );
}

export default HeadingItems;
