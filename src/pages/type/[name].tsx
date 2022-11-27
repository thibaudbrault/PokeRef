import React from 'react';
import { BackButton } from '../../components/Common/Inputs';
import { MainBig } from '../../components/Common/Sizing';
import { CardTitle } from '../../components/Common/Headings';
import { useMoves, usePokedex, useType } from '../../helpers/DataFetch';
import Loader from '../../components/Loader/Loader';
import FaChevronLeft from '@meronex/icons/fa/FaChevronLeft';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Damage = dynamic(
  () => import(`../../components/Types/TypeCard/Damage/Damage.TypeCard`),
);
const Moves = dynamic(
  () => import(`../../components/Types/TypeCard/Moves/Moves.TypeCard`),
);
const Pokemon = dynamic(
  () => import(`../../components/Types/TypeCard/Pokemon/Pokemon.TypeCard`),
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

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>
          {name.charAt(0).toUpperCase() + name.slice(1)} | Type | PokéRef
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
        <CardTitle>{type?.name}</CardTitle>

        <Damage type={type} />

        <Pokemon type={type} pokedex={pokedex} />

        <Moves type={type} moves={moves} />

        <Link href="/types" passHref>
          <BackButton>
            <FaChevronLeft /> Back to Types
          </BackButton>
        </Link>
      </MainBig>
    </>
  );
}

export default TypeCard;
