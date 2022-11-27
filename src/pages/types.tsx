import React from 'react';

import { MainSmall } from '../components/Common/Sizing';
import { ModifiedType, TypesList } from '../components/Types/StyledTypes';
import { useTypes } from '../../src/helpers/DataFetch';
import Loader from '../components/Loader/Loader';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { Types } from '@/types/types';

function Types() {
  const { isLoading, error, data: types } = useTypes();

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Types | Pokeref</title>
        <meta
          name="description"
          content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
        />
        <meta property="og:title" content="Types | Pokeref" />
        <meta
          property="og:description"
          content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
        />
        <meta property="og:url" content="https://pokeref.app/types" />
        <meta property="og:type" content="website" />
      </Head>
      <MainSmall>
        <TypesList>
          {types?.map((t: Types) => (
            <li key={t.name}>
              <ModifiedType id={t.name}>
                <Link
                  href={{ pathname: `/type/[name]`, query: { name: t.name } }}
                  key={t.name}
                >
                  <Image alt={t.name} />
                  <h2>{t.name}</h2>
                </Link>
              </ModifiedType>
            </li>
          ))}
        </TypesList>
      </MainSmall>
    </>
  );
}

export default Types;
