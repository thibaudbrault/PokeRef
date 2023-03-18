import { Subtitle, Title } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import BackBtn from '@/components/common/ui/BackBtn';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingPokemon from '@/components/pages/Pokemon/PokemonCard/Heading';
import { useFetchPokemon } from '@/components/pages/Pokemon/PokemonCard/Hooks/useFetchPokemon';
import Typing from '@/components/pages/Pokemon/PokemonCard/Types/Types.PokemonCard';
import { PokemonTitle } from '@/components/pages/Pokemon/Styled.Pokemon';
import { IEvolutionChain } from '@/types/Evolution/EvolutionChain';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { pokemonFilters } from '@/utils/DataArrays';
import { removeDash } from '@/utils/Typography';
import { HiOutlineSpeakerphone } from '@meronex/icons/hi';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface IEvolutionProps {
  evolution: IEvolutionChain;
  name: string;
}

interface IMovesProps {
  pokemon: IPokemon;
  version: string;
  name: string;
}

interface ICompetitiveProps {
  format: string;
  name: string;
}

interface IFormsProps {
  pokemon: IPokemon;
}

const Nav = dynamic(
  () => import(`@/components/pages/Pokemon/PokemonCard/Nav/Nav.PokemonCard`),
);
const Data = dynamic(
  () => import(`@/components/pages/Pokemon/PokemonCard/Data/Data.PokemonCard`),
);
const Evolution = dynamic<IEvolutionProps>(
  () =>
    import(
      `@/components/pages/Pokemon/PokemonCard/Evolution/Evolution.PokemonCard`
    ) as any,
);
const Info = dynamic(
  () => import(`@/components/pages/Pokemon/PokemonCard/Info/Info.PokemonCard`),
);
const Stats = dynamic(
  () =>
    import(`@/components/pages/Pokemon/PokemonCard/Stats/Stats.PokemonCard`),
);
const Moves = dynamic<IMovesProps>(
  () =>
    import(
      `@/components/pages/Pokemon/PokemonCard/Moves/Moves.PokemonCard`
    ) as any,
);
const Locations = dynamic(
  () =>
    import(
      `@/components/pages/Pokemon/PokemonCard/Locations/Locations.PokemonCard`
    ),
);
const Competitive = dynamic<ICompetitiveProps>(
  () =>
    import(
      `@/components/pages/Pokemon/PokemonCard/Competitive/Competitive.PokemonCard`
    ) as any,
);
const Forms = dynamic<IFormsProps>(
  () =>
    import(
      `@/components/pages/Pokemon/PokemonCard/Forms/Forms.PokemonCard`
    ) as any,
);
const Sprites = dynamic(
  () =>
    import(
      `@/components/pages/Pokemon/PokemonCard/Sprites/Sprites.PokemonCard`
    ),
);

type Props = {
  name: string;
};

function PokemonCard({ name }: Props) {
  const [game, setGame] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);
  const [format, setFormat] = useState<string | null>(null);

  const { pokemonId, pokemon, species, types, location, evolution } =
    useFetchPokemon(name);

  // Modify game and version according to the id of the pokemon
  const pokemonFiltersFn = () => {
    pokemonId &&
      pokemonFilters.filter((p) => {
        pokemonId > p.min &&
          pokemonId < p.max &&
          (setGame(p.game), setVersion(p.version), setFormat(p.format));
      });
  };

  const audioRef = useRef<HTMLAudioElement>(null);

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
    types.status === `error` ||
    location.status === `error`
  ) {
    return toast.error(`Something went wrong`);
  }

  if (
    pokemon.status === `loading` ||
    types.status === `loading` ||
    location.status === `loading` ||
    (species.status === `loading` && species.isInitialLoading) ||
    (evolution.status === `loading` && evolution.isInitialLoading)
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
                <HiOutlineSpeakerphone />
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

        <Nav
          pokemonId={pokemon.data?.id}
          setGame={setGame}
          setVersion={setVersion}
          setFormat={setFormat}
        />

        <Data pokemon={pokemon.data} species={species.data} game={game} />

        {evolution.data && <Evolution evolution={evolution.data} name={name} />}

        {pokemonId && pokemonId < 10000 && (
          <Info
            pokemon={pokemon.data}
            species={species.data}
            evolution={evolution.data}
          />
        )}

        <Stats pokemon={pokemon.data} />

        <Typing pokemon={pokemon.data} types={types.data} />

        {version && (
          <Moves pokemon={pokemon.data} version={version} name={name} />
        )}

        {game && <Locations location={location.data} game={game} />}

        {pokemon.data.forms.length > 1 && <Forms pokemon={pokemon.data} />}

        {format && <Competitive format={format} name={name} />}

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
