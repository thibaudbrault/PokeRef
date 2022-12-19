import React, { useState } from 'react';

import { MainBig } from '@/components/common/styles/Sizing';
import { MethodNav } from '@/components/common/styles/Navbars';
import { useMoves, useStatus } from '@/hooks/DataFetch';
import Loader from '@/components/common/ui/Loader/Loader';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const MovesTable = dynamic(
  () => import(`@/components/pages/Moves/Components/MovesTable.Moves`),
);
const StatusTable = dynamic(
  () => import(`@/components/pages/Moves/Components/StatusTable.Moves`),
);

function Moves() {
  const { isLoading, error, data: moves } = useMoves();
  const { data: status } = useStatus();

  const [toggle, setToggle] = useState(1);
  const pageShown = () => {
    if (toggle === 1) {
      return <MovesTable moves={moves} />;
    } else if (toggle === 2) {
      return <StatusTable status={status} />;
    }
  };

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Moves | Pokeref</title>
        <meta
          name="description"
          content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
        />
        <meta property="og:title" content="Moves | Pokeref" />
        <meta
          property="og:description"
          content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
        />
        <meta property="og:url" content="https://pokeref.app/moves" />
        <meta property="og:type" content="website" />
      </Head>
      <MainBig>
        <MethodNav id="head">
          <button
            id="btnMoves"
            className={toggle === 1 ? `button_active` : ``}
            onClick={() => setToggle(1)}
          >
            <p>Moves</p>
          </button>
          <button
            className={toggle === 2 ? `button_active` : ``}
            onClick={() => setToggle(2)}
          >
            <p>Status</p>
          </button>
        </MethodNav>

        {pageShown()}
      </MainBig>
    </>
  );
}

export default Moves;
