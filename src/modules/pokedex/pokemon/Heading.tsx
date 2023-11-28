import Head from 'next/head';

type Props = {
  name: string;
  description?: string;
};

export function Heading({ name, description }: Props) {
  return (
    <Head>
      <title>
        {`${name
          ?.replace(/-/g, ` `)
          .replace(/(^\w|\s\w)/g, (m) =>
            m.toUpperCase(),
          )}  | Pokémon | PokéRef`}
      </title>
      <meta
        name="description"
        content={description ? description : `Find every details about ${name}`}
      />
      <meta
        name="keywords"
        content={`${name}, ${name} pokeref, Pokemon, Pokémon, pokemon, pokémon, Pokedex, Pokédex, pokedex, pokédex, ${name} shiny`}
      />
      <meta property="og:title" content={`${name} | Pokémon | PokéRef`} />
      <meta
        property="og:description"
        content={description ? description : `Find every details about ${name}`}
      />
      <meta property="og:url" content={`https://pokeref.app/pokemon/${name}`} />
      <meta property="og:type" content="website" />
    </Head>
  );
}
