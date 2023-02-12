import Head from 'next/head';

type Props = {
  name: string;
};

function HeadingLocation({ name }: Props) {
  return (
    <Head>
      <title>
        {`${name
          ?.replace(/-/g, ` `)
          .replace(/(^\w|\s\w)/g, (m) =>
            m.toUpperCase(),
          )}  | Location | PokéRef`}
      </title>
      <meta name="description" content={`Find every details about ${name}`} />
      <meta property="og:title" content={`${name} | Location | PokéRef`} />
      <meta
        property="og:description"
        content={`Find every details about ${name}`}
      />
      <meta
        property="og:url"
        content={`https://pokeref.app/location/${name}`}
      />
      <meta property="og:type" content="website" />
    </Head>
  );
}

export default HeadingLocation;
