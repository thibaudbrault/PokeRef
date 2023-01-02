import React, { useState, useEffect } from 'react';
import { MainBig } from '../../components/common/styles/Sizing';
import {
  useEvolution,
  useMachines,
  useMoves,
  usePokemon,
  usePokemonLocation,
  useSpecies,
  useTypes,
} from '../../hooks/DataFetch';
import Loader from '../../components/common/ui/Loader/Loader';
import { Subtitle, Title } from '../../components/common/styles/Headings';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { speciesFilters } from '@/utils/DataArrays';
import { Species } from '@/types/types';
import BackBtn from '@/components/common/ui/BackBtn';

const Data = dynamic(
  () =>
    import(`../../components/pages/Pokemon/PokemonCard/Data/Data.PokemonCard`),
);
const Info = dynamic(
  () =>
    import(`../../components/pages/Pokemon/PokemonCard/Info/Info.PokemonCard`),
);
const Stats = dynamic(
  () =>
    import(
      `../../components/pages/Pokemon/PokemonCard/Stats/Stats.PokemonCard`
    ),
);
const MovesPokemon = dynamic(
  () =>
    import(
      `../../components/pages/Pokemon/PokemonCard/Moves/Moves.PokemonCard`
    ),
);
const Sprites = dynamic(
  () =>
    import(
      `../../components/pages/Pokemon/PokemonCard/Sprites/Sprites.PokemonCard`
    ),
);
const EvolutionPokemon = dynamic(
  (() =>
    import(
      `../../components/pages/Pokemon/PokemonCard/Evolution/Evolution.PokemonCard`
    )) as any,
);
const Nav = dynamic(
  () =>
    import(`../../components/pages/Pokemon/PokemonCard/Nav/Nav.PokemonCard`),
);

function PokemonCard() {
  const [name, setName] = useState(``);
  const router = useRouter();

  const [caught, setCaught] = useState(false);

  useEffect(() => {
    if (router && router.query && typeof router.query.name === `string`) {
      setName(router.query.name);
    }
  }, [router]);

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

  const speciesFiltersFn = (species: Species.Species) => {
    speciesFilters.forEach((s) => {
      species.id > s.min &&
        species.id < s.max &&
        (setGame(s.game), setVersion(s.version));
      return species;
    });
  };

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
          {typeof name === `string` &&
            name.charAt(0).toUpperCase() + name.slice(1)}
          {` `}| Pokémon | PokéRef
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
        <Subtitle>{species?.generation?.name.replace(/-/g, ` `)}</Subtitle>

        <Nav pokemon={pokemon} setGame={setGame} setVersion={setVersion} />

        <Data
          pokemon={pokemon}
          species={species}
          location={location}
          game={game}
        />

        <EvolutionPokemon evolution={evolution} />

        <Info pokemon={pokemon} species={species} evolution={evolution} />

        <Stats
          toggleType={toggleType}
          toggleTypeTable={toggleTypeTable}
          pokemon={pokemon}
          types={types}
        />

        <MovesPokemon
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
          <BackBtn name="Pokedex" />
        </Link>
      </MainBig>
    </>
  );
}

export default PokemonCard;
