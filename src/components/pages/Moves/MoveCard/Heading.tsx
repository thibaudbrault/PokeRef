import Head from 'next/head';
import React from 'react';

type Props = {
  name: string;
};

function HeadingMove({ name }: Props) {
  return (
    <Head>
      <title>
        {`${name
          ?.replace(/-/g, ` `)
          .replace(/(^\w|\s\w)/g, (m) =>
            m.toUpperCase(),
          )}  | Move | PokéRef`}
      </title>
      <meta name="description" content={`Find every details about ${name}`} />
      <meta property="og:title" content={`${name} | Moves | PokéRef`} />
      <meta
        property="og:description"
        content={`Find every details about ${name}`}
      />
      <meta property="og:url" content={`https://pokeref.app/move/${name}`} />
      <meta property="og:type" content="website" />
    </Head>
  );
}

export default HeadingMove;
