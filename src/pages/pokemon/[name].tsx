import { Subtitle, Title } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import BackBtn from '@/components/common/ui/BackBtn';
import { Divider } from '@/components/common/ui/Divider';
import Loader from '@/components/common/ui/Loader/Loader';
import { PokemonTitle } from '@/modules/pokedex/Styled.Pokemon';
import {
  Content,
  Heading,
  Nav,
  Data,
  Evolution,
  Info,
  Stats,
  useFetchPokemon,
  Moves,
  Locations,
  Forms,
  Competitive,
  Sprites,
  Cards,
  Types,
} from '@/modules/pokedex/pokemon';
import { pokemonFilters, removeDash, removeLongName } from '@/utils';
import { HiOutlineSpeakerphone } from '@meronex/icons/hi';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
  name: string;
};

function PokemonCard({ name }: Props) {
  const [game, setGame] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);
  const [format, setFormat] = useState<string | null>(null);

  const { pokemonId, pokemon, species, types, location, evolution, cards } =
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

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonId]);

  if (
    pokemon.status === `error` ||
    types.status === `error` ||
    location.status === `error`
  ) {
    return toast.error(`Something went wrong`, {
      style: {
        fontSize: `1.7rem`,
      },
    });
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
      <Heading name={name} />
      <MainBig>
        <PokemonTitle>
          {pokemon.data?.name?.includes(`mega`) ? (
            <Title>
              {removeDash(pokemon.data?.name).split(` `).reverse().join(` `)}
            </Title>
          ) : (
            <Title>{removeLongName(removeDash(name))}</Title>
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

        <Content />

        <Data pokemon={pokemon.data} species={species.data} game={game} />

        <Divider />

        {evolution.data && <Evolution evolution={evolution.data} name={name} />}

        <Divider />

        {pokemonId && pokemonId < 10000 && (
          <Info
            pokemon={pokemon.data}
            species={species.data}
            evolution={evolution.data}
          />
        )}

        <Divider />

        <Stats pokemon={pokemon.data} />

        <Divider />

        {types.data && (
          <>
            <Types types={types.data} />
            <Divider />
          </>
        )}

        {version && (
          <>
            <Moves pokemon={pokemon.data} version={version} name={name} />
            <Divider />
          </>
        )}

        {game && (
          <>
            <Locations location={location.data} game={game} />
            <Divider />
          </>
        )}

        {pokemon.data.forms.length > 1 && (
          <>
            <Forms pokemon={pokemon.data} />
            <Divider />
          </>
        )}

        {format && (
          <>
            <Competitive format={format} name={name} />
            <Divider />
          </>
        )}

        <Sprites pokemon={pokemon.data} />

        <Divider />

        {cards.data && <Cards cards={cards.data} />}

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
