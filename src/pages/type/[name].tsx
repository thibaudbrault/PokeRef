import React from 'react';
import { MainBig } from '../../components/common/styles/Sizing';
import { CardTitle } from '../../components/common/styles/Headings';
import { useMoves, usePokedex, useType } from '../../hooks/DataFetch';
import Loader from '../../components/common/ui/Loader/Loader';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import BackBtn from '@/components/common/ui/BackBtn';

const Damage = dynamic(
  () => import(`../../components/pages/Types/TypeCard/Damage/Damage.TypeCard`),
);
const Moves = dynamic(
  () => import(`../../components/pages/Types/TypeCard/Moves/Moves.TypeCard`),
);
const Pokemon = dynamic(
  () =>
    import(`../../components/pages/Types/TypeCard/Pokemon/Pokemon.TypeCard`),
);

function TypeCard() {
  const router = useRouter();
  const { name } = router.query;

  const {
    isLoading,
    error,
    data: type,
  } = useType(`https://pokeapi.co/api/v2/type/${name}`);

  const { data: pokedex } = usePokedex(
    `https://pokeapi.co/api/v2/pokemon?limit=905`,
  );

  const { data: moves } = useMoves();

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
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
      <MainBig>
        <CardTitle>{type.name}</CardTitle>

        <Damage type={type} />

        <Pokemon type={type} pokedex={pokedex} />

        <Moves type={type} moves={moves} />

        <Link href="/types" passHref>
          <BackBtn name="Types" />
        </Link>
      </MainBig>
    </>
  );
}

export default TypeCard;
