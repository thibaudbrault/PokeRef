import React, { useState, useEffect } from 'react';
import { MainBig } from '../../components/Common/Sizing';
import { BackButton } from '../../components/Common/Inputs';
import {
  useEvolution,
  useMachines,
  useMoves,
  usePokemon,
  usePokemonLocation,
  useSpecies,
  useTypes,
} from '../../hooks/DataFetch';
import { FaChevronLeft } from '@meronex/icons/fa';
import Loader from '../../components/Loader/Loader';
import { Subtitle, Title } from '../../components/Common/Headings';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Data = dynamic(
  () => import(`../../components/Pokemon/PokemonCard/Data/Data.PokemonCard`),
);
const Info = dynamic(
  () => import(`../../components/Pokemon/PokemonCard/Info/Info.PokemonCard`),
);
const Stats = dynamic(
  () => import(`../../components/Pokemon/PokemonCard/Stats/Stats.PokemonCard`),
);
const Moves = dynamic(
  () => import(`../../components/Pokemon/PokemonCard/Moves/Moves.PokemonCard`),
);
const Sprites = dynamic(
  () =>
    import(`../../components/Pokemon/PokemonCard/Sprites/Sprites.PokemonCard`),
);
const Evolution = dynamic(
  () =>
    import(
      `../../components/Pokemon/PokemonCard/Evolution/Evolution.PokemonCard`
    ),
);
const Nav = dynamic(
  () => import(`../../components/Pokemon/PokemonCard/Nav/Nav.PokemonCard`),
);

function PokemonCard() {
  const router = useRouter();
  const { name } = router.query;

  // Import data fetch
  const {
    isLoading,
    error,
    data: pokemon,
  } = usePokemon(`https://pokeapi.co/api/v2/pokemon/${name}`);

  const { data: species } = useSpecies(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`,
  );

  const { data: moves } = useMoves();

  const evolutionChainUrl = species?.evolution_chain?.url;

  const { data: evolution } = useEvolution(`${evolutionChainUrl}`);

  const { data: types } = useTypes();

  const { data: machines } = useMachines();

  const { data: location } = usePokemonLocation(
    `https://pokeapi.co/api/v2/pokemon/${name}/encounters`,
  );

  // Modify game and version according to the id of the pokemon
  const [game, setGame] = useState(``);
  const [version, setVersion] = useState(``);

  useEffect(() => {
    if (species?.id < 152) {
      setGame(`yellow`);
      setVersion(`yellow`);
    } else if (species?.id > 151 && species?.id < 252) {
      setGame(`crystal`);
      setVersion(`crystal`);
    } else if (species?.id > 251 && species?.id < 387) {
      setGame(`emerald`);
      setVersion(`emerald`);
    } else if (species?.id > 386 && species?.id < 494) {
      setGame(`platinum`);
      setVersion(`platinum`);
    } else if (species?.id > 493 && species?.id < 650) {
      setGame(`black-2`);
      setVersion(`black-2-white-2`);
    } else if (species?.id > 649 && species?.id < 722) {
      setGame(`x`);
      setVersion(`x-y`);
    } else if (species?.id > 721 && species?.id < 810) {
      setGame(`ultra-sun`);
      setVersion(`ultra-sun-ultra-moon`);
    } else if (species?.id > 809 && species?.id < 898) {
      setGame(`sword`);
      setVersion(`sword-shield`);
    }
  }, [species]);

  // Toggle for moves table
  const [toggleState, setToggleState] = useState(0);
  const toggleTable = (index: number) => {
    setToggleState(index);
  };

  // Toggle for types table
  const [toggleType, setToggleType] = useState(1);
  const toggleTypeTable = (index: number) => {
    setToggleType(index);
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
        <title>
          {name.charAt(0).toUpperCase() + name.slice(1)} | Pokémon | PokéRef
        </title>
        <meta name="description" content={`Find every details about ${name}`} />
        <meta property="og:title" content={`${name} | Pokémon | PokéRef`} />
        <meta
          property="og:description"
          content={`Find every details about ${name}`}
        />
        <meta
          property="og:url"
          content={`https://pokeref.app/pokemon/${name}`}
        />
        <meta property="og:type" content="website" />
      </Head>
      <MainBig>
        {pokemon?.name?.includes(`mega`) ? (
          <Title>
            {pokemon?.name?.replace(/-/g, ` `).split(` `).reverse().join(` `)}
          </Title>
        ) : (
          <Title>{pokemon?.name?.replace(/-/g, ` `)}</Title>
        )}
        <Subtitle>{species?.generation?.name?.replace(/-/g, ` `)}</Subtitle>

        <Nav
          pokemon={pokemon}
          species={species}
          setGame={setGame}
          setVersion={setVersion}
        />

        <Data
          pokemon={pokemon}
          species={species}
          location={location}
          game={game}
        />

        <Evolution evolution={evolution} pokemon={pokemon} />

        <Info pokemon={pokemon} species={species} evolution={evolution} />

        <Stats
          toggleType={toggleType}
          toggleTypeTable={toggleTypeTable}
          pokemon={pokemon}
          type={types}
        />

        <Moves
          toggleState={toggleState}
          toggleTable={toggleTable}
          pokemon={pokemon}
          moves={moves}
          machines={machines}
          version={version}
          game={game}
        />

        <Sprites pokemon={pokemon} />

        <Link href="/" passHref>
          <BackButton>
            <FaChevronLeft /> Back to Pokemon
          </BackButton>
        </Link>
      </MainBig>
    </>
  );
}

export default PokemonCard;
