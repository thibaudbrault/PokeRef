import Head from 'next/head';

export function Heading() {
  return (
    <Head>
      <title>Machines | Pokeref</title>
      <meta
        name="description"
        content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
      />
      <meta property="og:title" content="Machines | Pokeref" />
      <meta
        property="og:description"
        content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
      />
      <meta property="og:url" content="https://pokeref.app/machines" />
      <meta property="og:type" content="website" />
    </Head>
  );
}
