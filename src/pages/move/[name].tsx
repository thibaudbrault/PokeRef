import React, { useState } from 'react';
import { CardTitle, Subtitle } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import { useMachines, useMove, usePokedex } from '@/hooks/DataFetch';
import Loader from '@/components/common/ui/Loader/Loader';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import BackBtn from '@/components/common/ui/BackBtn';
import List from '@/components/pages/Moves/MoveCard/List/List.MoveCard';

const Nav = dynamic(
  () => import(`@/components/pages/Moves/MoveCard/Nav/Nav.MoveCard`),
);
const Data = dynamic(
  () => import(`@/components/pages/Moves/MoveCard/Data/Data.MoveCard`),
);
const LearnMethod = dynamic(() =>
  import(`@/utils/ObjectsMap`).then((res) => res.LearnMethod),
);

function MoveCard() {
  const router = useRouter();
  const { name } = router.query;

  // Import data fetch
  const {
    isLoading,
    error,
    data: move,
  } = useMove(`https://pokeapi.co/api/v2/move/${name}`);

  const { data: pokedex } = usePokedex(
    `https://pokeapi.co/api/v2/pokemon?limit=905`,
  );

  const { data: machines } = useMachines();

  // Version of the returned data is from the latest available from PokéAPI
  const [version, setVersion] = useState(`ultra-sun-ultra-moon`);

  // Switch between the different tables for the method to learn the move
  const [toggle, setToggle] = useState(0);

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
      <MainBig>
        <CardTitle>{move.name.replace(/-/g, ` `)}</CardTitle>
        <Subtitle>{move.generation.name.replace(/-/g, ` `)}</Subtitle>

        <Nav move={move} setVersion={setVersion} />

        <Data move={move} machines={machines} version={version} />

        <LearnMethod toggle={toggle} setToggle={setToggle} />

        <List
          toggle={toggle}
          pokedex={pokedex}
          moveName={move.name}
          version={version}
        />

        <Link href="/moves" passHref>
          <BackBtn name="Moves" />
        </Link>
      </MainBig>
    </>
  );
}

export default MoveCard;
