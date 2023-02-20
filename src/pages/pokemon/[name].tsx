import { Subtitle, Title } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import BackBtn from '@/components/common/ui/BackBtn';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingPokemon from '@/components/pages/Pokemon/PokemonCard/Heading';
import { useFetchPokemon } from '@/components/pages/Pokemon/PokemonCard/Hooks/useFetchPokemon';
import { PokemonTitle } from '@/components/pages/Pokemon/Styled.Pokemon';
import { pokemonFilters } from '@/utils/DataArrays';
import { removeDash } from '@/utils/Typography';
import { GiSpeaker } from '@meronex/icons/gi';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const Data = dynamic(
  () => import(`@/components/pages/Pokemon/PokemonCard/Data/Data.PokemonCard`),
);
const Evolution = dynamic(
  () =>
    import(
      `@/components/pages/Pokemon/PokemonCard/Evolution/Evolution.PokemonCard`
    ),
);
const Info = dynamic(
  () => import(`@/components/pages/Pokemon/PokemonCard/Info/Info.PokemonCard`),
);
const Stats = dynamic(
  () =>
    import(`@/components/pages/Pokemon/PokemonCard/Stats/Stats.PokemonCard`),
);
const MovesPokemon = dynamic(
  () =>
    import(`@/components/pages/Pokemon/PokemonCard/Moves/Moves.PokemonCard`),
);
const Forms = dynamic(
  () =>
    import(`@/components/pages/Pokemon/PokemonCard/Forms/Forms.PokemonCard`),
);
const Sprites = dynamic(
  () =>
    import(
      `@/components/pages/Pokemon/PokemonCard/Sprites/Sprites.PokemonCard`
    ),
);
const Nav = dynamic(() => import(`@/components/common/ui/GenNav`));

type Props = {
  name: string;
};

function PokemonCard({ name }: Props) {
  const {
    pokemonId,
    game,
    setGame,
    version,
    setVersion,
    pokemon,
    species,
    moves,
    types,
    machines,
    location,
    evolution,
  } = useFetchPokemon(name);

  // Modify game and version according to the id of the pokemon
  const pokemonFiltersFn = () => {
    pokemonId &&
      pokemonFilters.filter((p) => {
        pokemonId > p.min &&
          pokemonId < p.max &&
          (setGame(p.game), setVersion(p.version));
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
    pokemonFiltersFn();
  }, [pokemonId]);

  if (
    pokemon.status === `error` ||
    types.status === 'error' ||
    machines.status === 'error' ||
    location.status === 'error'
  ) {
    return toast.error(`Something went wrong: ${error.message}`);
  }

  if (
    pokemon.status === `loading` ||
    types.status === 'loading' ||
    machines.status === 'loading' ||
    location.status === 'loading'
  ) {
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
        {species.data && (
          <Subtitle>{removeDash(species.data?.generation?.name)}</Subtitle>
        )}

        <Nav setGame={setGame} setVersion={setVersion} />

        <Data
          pokemon={pokemon.data}
          species={species.data}
          location={location.data}
          game={game}
        />
        {evolution.data && <Evolution evolution={evolution.data} name={name} />}

        {pokemonId && pokemonId < 10000 && (
          <Info
            pokemon={pokemon.data}
            species={species.data}
            evolution={evolution.data}
          />
        )}

        <Stats pokemon={pokemon.data} types={types.data} />

        {game && version && (
          <MovesPokemon
            pokemon={pokemon.data}
            moves={moves.data}
            machines={machines.data}
            version={version}
            game={game}
          />
        )}

        {pokemon.data.forms.length > 1 && <Forms pokemon={pokemon.data} />}

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
