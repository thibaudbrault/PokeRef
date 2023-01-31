import React from 'react';
import { MainBig } from '@/components/common/styles/Sizing';
import { CardTitle } from '@/components/common/styles/Headings';
import { useMoves, usePokedex, useType } from '@/utils/DataFetch';
import Loader from '@/components/common/ui/Loader/Loader';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import BackBtn from '@/components/common/ui/BackBtn';
import HeadingType from '@/components/pages/Types/TypeCard/Heading';
import { useRouterIsReady } from '@/hooks/useRouterIsReady';

const DamageType = dynamic(
  () => import(`../../components/pages/Types/TypeCard/Damage/Damage.TypeCard`),
);
const MovesType = dynamic(
  () => import(`../../components/pages/Types/TypeCard/Moves/Moves.TypeCard`),
);
const PokemonType = dynamic(
  () =>
    import(`../../components/pages/Types/TypeCard/Pokemon/Pokemon.TypeCard`),
);

function TypeCard() {
  const { name } = useRouterIsReady();

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
      <HeadingType name={name} />
      <MainBig>
        <CardTitle>{type?.name}</CardTitle>

        <DamageType type={type} />

        <PokemonType type={type} pokedex={pokedex} />

        <MovesType type={type} moves={moves} />

        <Link href="/types" passHref>
          <BackBtn name="Types" />
        </Link>
      </MainBig>
    </>
  );
}

export default TypeCard;
