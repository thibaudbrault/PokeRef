import { Subtitle, Title } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import BackBtn from '@/components/common/ui/BackBtn';
import Loader from '@/components/common/ui/Loader/Loader';
import SmallLoader from '@/components/common/ui/Loader/SmallLoader';
import HeadingPokemon from '@/components/pages/Pokemon/PokemonCard/Heading';
import { PokemonTitle } from '@/components/pages/Pokemon/Styled.Pokemon';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { pokemonFilters } from '@/utils/DataArrays';
import {
  getEvolution,
  getMachines,
  getMoves,
  getPokemon,
  getPokemonLocation,
  getSpecies,
  getTypes
} from '@/utils/DataFetch';
import { removeDash } from '@/utils/Typography';
import { GiSpeaker } from '@meronex/icons/gi';
import { useQueries, useQuery } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Data = dynamic(
  () =>
    import(`@/components/pages/Pokemon/PokemonCard/Data/Data.PokemonCard`),
);
const Evolution = dynamic(
  () =>
    import(
      `@/components/pages/Pokemon/PokemonCard/Evolution/Evolution.PokemonCard`
    ),
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
const Nav = dynamic(
  () =>
    import(`@/components/common/ui/GenNav`),
);

type Props = {
  name: string;
};

function PokemonCard({ name }: Props) {

  console.log(name)

  const [pokemonId, setPokemonId] = useState<number | null>(null)

  const [pokemon, species, moves, types, machines, location] = useQueries({
    queries: [
      {
        queryKey: [`pokemon`, name],
        queryFn: () => getPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`),
        onSuccess: (data: IPokemon) => {
          setPokemonId(data.id)
        },
      },
      {
        queryKey: [`species`, name],
        queryFn: () =>
          getSpecies(`https://pokeapi.co/api/v2/pokemon-species/${name}`),
      },
      {
        queryKey: [`moves`, name],
        queryFn: getMoves,
      },
      {
        queryKey: [`types`, name],
        queryFn: getTypes,
      },
      {
        queryKey: [`machines`, name],
        queryFn: getMachines,
      },
      {
        queryKey: [`encounter`, name],
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
  const pokemonFiltersFn = () => {
    pokemonId && pokemonFilters.filter((p) => {
      pokemonId > p.min && pokemonId < p.max && (
        setGame(p.game),
        setVersion(p.version)
      )
    });
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
    pokemonFiltersFn()
  }, [pokemonId]);

  if (pokemon.status === `error`) {
    return { error };
  }

  if (pokemon.status === `loading` || species.status === 'loading' || moves.status === 'loading' || types.status === 'loading' || machines.status === 'loading' || location.status === 'loading' || evolution.status === 'loading') {
    return <Loader />;
  }

  return (
    <>
      <HeadingPokemon name={name} />
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

        <Evolution evolution={evolution.data} />

        <Info pokemon={pokemon.data} species={species.data} evolution={evolution.data} />

        <Stats
          pokemon={pokemon.data}
          types={types.data}
        />
        {game && version ? (
          <MovesPokemon
            pokemon={pokemon.data}
            moves={moves.data}
            machines={machines.data}
            version={version}
            game={game}
          />
        ) : (
          <SmallLoader />
        )}

        <Sprites pokemon={pokemon.data} />

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
