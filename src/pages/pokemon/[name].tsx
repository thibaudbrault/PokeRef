import { Subtitle, Title } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import {
  getEvolution,
  getMachines,
  getMoves,
  getPokemon,
  getPokemonLocation,
  getSpecies,
  getTypes
} from '@/utils/DataFetch';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import BackBtn from '@/components/common/ui/BackBtn';
import { PokemonTitle } from '@/components/pages/Pokemon/Styled.Pokemon';
import { IPokemonSpecies } from '@/types/Pokemon/PokemonSpecies';
import { speciesFilters } from '@/utils/DataArrays';
import { removeDash } from '@/utils/Typography';
import { GiSpeaker } from '@meronex/icons/gi';
import { useQueries, useQuery } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';

const Data = dynamic(
  () =>
    import(`@/components/pages/Pokemon/PokemonCard/Data/Data.PokemonCard`),
);
const Info = dynamic(
  () =>
    import(`@/components/pages/Pokemon/PokemonCard/Info/Info.PokemonCard`),
);
const Stats = dynamic(
  () =>
    import(
      `@/components/pages/Pokemon/PokemonCard/Stats/Stats.PokemonCard`
    ),
);
const MovesPokemon = dynamic(
  () =>
    import(
      `@/components/pages/Pokemon/PokemonCard/Moves/Moves.PokemonCard`
    ),
);
const Sprites = dynamic(
  () =>
    import(
      `@/components/pages/Pokemon/PokemonCard/Sprites/Sprites.PokemonCard`
    ),
);
const EvolutionPokemon = dynamic(
  (() =>
    import(
      `@/components/pages/Pokemon/PokemonCard/Evolution/Evolution.PokemonCard`
    )) as any,
);
const Nav = dynamic(
  () =>
    import(`@/components/common/ui/GenNav`),
);

type Props = {
  name: string;
};

function PokemonCard({ name }: Props) {
  const [pokemon, species, moves, types, machines, location] = useQueries({
    queries: [
      {
        queryKey: [`pokemon`],
        queryFn: () => getPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`),
      },
      {
        queryKey: [`species`],
        queryFn: () =>
          getSpecies(`https://pokeapi.co/api/v2/pokemon-species/${name}`),
      },
      {
        queryKey: [`moves`],
        queryFn: getMoves,
      },
      {
        queryKey: [`types`],
        queryFn: getTypes,
      },
      {
        queryKey: [`machines`],
        queryFn: getMachines,
      },
      {
        queryKey: [`encounter`],
        queryFn: () =>
          getPokemonLocation(
            `https://pokeapi.co/api/v2/pokemon/${name}/encounters`,
          ),
      },
    ],
  });

  const evolutionChainUrl = species.data?.evolution_chain?.url;

  const evolution = useQuery({
    queryKey: [`evolution`],
    queryFn: () => getEvolution(evolutionChainUrl),
    enabled: !!evolutionChainUrl,
  });

  const [game, setGame] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);

  // Modify game and version according to the id of the pokemon
  const speciesFiltersFn = (species: IPokemonSpecies) => {
    speciesFilters.forEach((s) => {
      species?.id > s.min &&
        species?.id < s.max &&
        (setGame(s.game), setVersion(s.version));
    });
  };

  // Toggle for types table
  const [toggleType, setToggleType] = useState(1);
  const toggleTypeTable = (index: number) => {
    setToggleType(index);
  };

  const audioRef = useRef();

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      console.error(`Error playing audio`);
    }
  };

  useEffect(() => {
    speciesFiltersFn(species.data)
  }, []);

  if (pokemon.status === `error`) {
    return { error };
  }

  if (pokemon.status === `loading`) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>
          {typeof name === `string` &&
            name
              .replace(/-/g, ` `)
              .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
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
        <PokemonTitle>
          {pokemon.data?.name?.includes(`mega`) ? (
            <Title>
              {removeDash(pokemon.data?.name).split(` `).reverse().join(` `)}
            </Title>
          ) : (
            <Title>{removeDash(pokemon.data?.name)}</Title>
          )}
          {pokemon.data?.id < 722 && (
            <div>
              <button onClick={play}>
                <GiSpeaker />
              </button>
              <audio
                ref={audioRef}
                src={`https://raw.githubusercontent.com/thibaudbrault/pokeref_medias/main/cries/${pokemon.data?.id}.ogg`}
              />
            </div>
          )}
        </PokemonTitle>
        <Subtitle>{removeDash(species.data?.generation?.name)}</Subtitle>

        <Nav setGame={setGame} setVersion={setVersion} />
        {game &&
          <Data
            pokemon={pokemon.data}
            species={species.data}
            location={location.data}
            game={game}
          />
        }

        {/* <EvolutionPokemon evolution={evolution} />

        <Info pokemon={pokemon} species={species} evolution={evolution} />

        <Stats
          toggleType={toggleType}
          toggleTypeTable={toggleTypeTable}
          pokemon={pokemon}
          types={types}
        />

        <MovesPokemon
          pokemon={pokemon}
          moves={moves}
          machines={machines}
          version={version}
          game={game}
        />

        <Sprites pokemon={pokemon} /> */}

        <Link href="/" passHref>
          <BackBtn name="Pokedex" />
        </Link>
      </MainBig>
    </>
  );
}

export default PokemonCard;

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { name } = context.query;
  return {
    props: {
      name,
    },
  };
}
