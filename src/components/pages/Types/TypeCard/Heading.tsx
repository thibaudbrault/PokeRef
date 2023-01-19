import Head from 'next/head';
import React from 'react';

type Props = {
  name: string | string[] | undefined;
};

function HeadingType({ name }: Props) {
  return (
    <Head>
      <title>
        {typeof name === `string` &&
          name?.charAt(0).toUpperCase() + name?.slice(1)}
        {` `}| Type | PokéRef
      </title>
      <meta
        name="description"
        content={`Find every details about the ${name} type`}
      />
      <meta property="og:title" content={`${name} | Type | PokéRef`} />
      <meta
        property="og:description"
        content={`Find every details about the ${name} type`}
      />
      <meta property="og:url" content={`https://pokeref.app/type/${name}`} />
      <meta property="og:type" content="website" />
    </Head>
  );
}

export default HeadingType;
