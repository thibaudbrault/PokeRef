import Head from 'next/head';
import React from 'react';

type Props = {
  name: string | string[] | undefined;
};

function HeadingMove({ name }: Props) {
  return (
    <Head>
      <title>
        {typeof name === `string` &&
          name?.charAt(0).toUpperCase() + name?.slice(1)}
        {` `}| Moves | PokéRef
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
