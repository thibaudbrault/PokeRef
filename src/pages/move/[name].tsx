import React, { useState } from 'react';

import { CardTitle, H3, Subtitle } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import {
  MoveLearnSection,
  MoveLink,
  MoveList,
  MoveText,
  MoveTypes,
} from '@/components/pages/Moves/MoveCard/Styled.MoveCard.jsx';
import { Type } from '@/components/common/styles/Themes';
import { useMachines, useMove, usePokedex } from '@/hooks/DataFetch';
import Loader from '@/components/common/ui/Loader/Loader';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Pokemon } from '@/types/types';
import BackBtn from '@/components/common/ui/BackBtn';

const Nav = dynamic(
  () => import(`@/components/pages/Moves/MoveCard/Nav/Nav.MoveCard`),
);
const Data = dynamic(
  () => import(`@/components/pages/Moves/MoveCard/Data/Data.MoveCard`),
);
const LearnMethod = dynamic(() =>
  import(`@/utils/ObjectsMap`).then((res) => res.LearnMethod),
);

function MoveCard() {
  const router = useRouter();
  const { name } = router.query;

  // Import data fetch
  const {
    isLoading,
    error,
    data: move,
  } = useMove(`https://pokeapi.co/api/v2/move/${name}`);

  const { data: pokedex } = usePokedex(
    `https://pokeapi.co/api/v2/pokemon?limit=905`,
  );

  const { data: machines } = useMachines();

  // Version of the returned data is from the latest available from PokéAPI
  const [version, setVersion] = useState(`ultra-sun-ultra-moon`);

  // Switch between the different tables for the method to learn the move
  const [toggleState, setToggleState] = useState<number>(0);
  const toggleTable = (index: number) => {
    setToggleState(index);
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
            name?.charAt(0).toUpperCase() + name?.slice(1)}
          {` `}| Moves | PokéRef
        </title>
        <meta name="description" content={`Find every details about ${name}`} />
        <meta property="og:title" content={`${name} | Moves | PokéRef`} />
        <meta
          property="og:description"
          content={`Find every details about ${name}`}
        />
        <meta property="og:url" content={`https://pokeref.app/move/${name}`} />
        <meta property="og:type" content="website" />
      </Head>
      <MainBig>
        <CardTitle>{move.name.replace(/-/g, ` `)}</CardTitle>
        <Subtitle>{move.generation.name.replace(/-/g, ` `)}</Subtitle>

        <Nav move={move} setVersion={setVersion} />

        <Data move={move} machine={machines} version={version} />

        <LearnMethod toggleState={toggleState} toggleTable={toggleTable} />

        <MoveLearnSection visibility={toggleState === 0}>
          <H3>Learned by leveling up</H3>
          <MoveText>
            Learned when the pokémon reach a ceratin level. Data from Pokémon
            {` `}
            <span>{version.replace(/-/g, ` `)}</span>. These information may
            vary in other games. Check the respective pokédex pages for details.
          </MoveText>
          <MoveList>
            {pokedex?.map((p: Pokemon.Pokemon) =>
              p.moves?.map(
                (pm) =>
                  pm.move.name === move.name &&
                  pm.version_group_details?.map(
                    (pmv) =>
                      pmv.version_group.name === version &&
                      pmv.move_learn_method.name === `level-up` &&
                      pmv.level_learned_at > 1 && (
                        <li key={p.name}>
                          <Image
                            src={p.sprites.front_default}
                            alt={p.name}
                            width={96}
                            height={96}
                          />
                          <MoveLink
                            href={{
                              pathname: `/pokemon/[name]`,
                              query: { name: p.name },
                            }}
                            key={p.name}
                          >
                            {p.name.replace(/-/g, ` `)}
                          </MoveLink>
                          <p>Level {pmv.level_learned_at}</p>
                          <MoveTypes>
                            {p.types?.map((pt) => (
                              <Type id={pt.type.name} key={pt.type.name}>
                                <Image
                                  alt={pt.type.name}
                                  width={15}
                                  height={15}
                                />
                                <span>{pt.type.name}</span>
                              </Type>
                            ))}
                          </MoveTypes>
                        </li>
                      ),
                  ),
              ),
            )}
          </MoveList>
        </MoveLearnSection>

        <MoveLearnSection visibility={toggleState === 1}>
          <H3>Learned from a TM / HM</H3>
          <MoveText>
            Learned by using a TM or a HM. Data from Pokémon{` `}
            <span>{version.replace(/-/g, ` `)}</span>. These information may
            vary in other games. Check the respective pokédex pages for details.
          </MoveText>
          <MoveList>
            {pokedex?.map((p: Pokemon.Pokemon) =>
              p.moves?.map(
                (pm) =>
                  pm.move.name === move.name &&
                  pm.version_group_details?.map(
                    (pmv) =>
                      pmv.version_group.name === version &&
                      pmv.move_learn_method.name === `machine` &&
                      pmv.level_learned_at === 0 && (
                        <li key={p.name}>
                          <Image
                            src={p.sprites.front_default}
                            alt={p.name}
                            width={96}
                            height={96}
                          />
                          <MoveLink
                            href={{
                              pathname: `/pokemon/[name]`,
                              query: { name: p.name },
                            }}
                            key={p.name}
                          >
                            {p.name.replace(/-/g, ` `)}
                          </MoveLink>
                          <MoveTypes>
                            {p.types?.map((pt) => (
                              <Type id={pt.type.name} key={pt.type.name}>
                                <Image
                                  alt={pt.type.name}
                                  width={15}
                                  height={15}
                                />
                                <span>{pt.type.name}</span>
                              </Type>
                            ))}
                          </MoveTypes>
                        </li>
                      ),
                  ),
              ),
            )}
          </MoveList>
        </MoveLearnSection>

        <MoveLearnSection visibility={toggleState === 2}>
          <H3>Learned from the move relearner / by breeding</H3>
          <MoveText>
            Learned via the move relearner or through breeding. Data from
            Pokémon <span>{version.replace(/-/g, ` `)}</span>. These information
            may vary in other games. Check the respective pokédex pages for
            details.
          </MoveText>
          <MoveList>
            {pokedex?.map((p: Pokemon.Pokemon) =>
              p.moves?.map(
                (pm) =>
                  pm.move.name === move.name &&
                  pm.version_group_details?.map(
                    (pmv) =>
                      pmv.version_group.name === version &&
                      (pmv.move_learn_method.name === `egg` ||
                        (pmv.move_learn_method.name === `level-up` &&
                          pmv.level_learned_at === 1)) && (
                        <li key={p.name}>
                          <Image
                            src={p.sprites.front_default}
                            alt={p.name}
                            width={96}
                            height={96}
                          />
                          <MoveLink
                            href={{
                              pathname: `/pokemon/[name]`,
                              query: { name: p.name },
                            }}
                            key={p.name}
                          >
                            {p.name.replace(/-/g, ` `)}
                          </MoveLink>
                          <MoveTypes>
                            {p.types?.map((pt) => (
                              <Type id={pt.type.name} key={pt.type.name}>
                                <Image
                                  alt={pt.type.name}
                                  width={15}
                                  height={15}
                                />
                                <span>{pt.type.name}</span>
                              </Type>
                            ))}
                          </MoveTypes>
                        </li>
                      ),
                  ),
              ),
            )}
          </MoveList>
        </MoveLearnSection>

        <MoveLearnSection visibility={toggleState === 3}>
          <H3>Learned from the move tutor</H3>
          <MoveText>
            Learned by going to the move tutor. Data from Pokémon{` `}
            <span>{version.replace(/-/g, ` `)}</span>. These information may
            vary in other games. Check the respective pokédex pages for details.
          </MoveText>
          <MoveList>
            {pokedex?.map((p: Pokemon.Pokemon) =>
              p.moves?.map(
                (pm) =>
                  pm.move.name === move.name &&
                  pm.version_group_details?.map(
                    (pmv) =>
                      pmv.version_group.name === version &&
                      pmv.move_learn_method.name === `tutor` && (
                        <li key={p.name}>
                          <Image
                            src={p.sprites.front_default}
                            alt={p.name}
                            width={96}
                            height={96}
                          />
                          <MoveLink
                            href={{
                              pathname: `/pokemon/[name]`,
                              query: { name: p.name },
                            }}
                            key={p.name}
                          >
                            {p.name.replace(/-/g, ` `)}
                          </MoveLink>
                          <MoveTypes>
                            {p.types?.map((pt) => (
                              <Type id={pt.type.name} key={pt.type.name}>
                                <Image
                                  alt={pt.type.name}
                                  width={15}
                                  height={15}
                                />
                                <span>{pt.type.name}</span>
                              </Type>
                            ))}
                          </MoveTypes>
                        </li>
                      ),
                  ),
              ),
            )}
          </MoveList>
        </MoveLearnSection>

        <MoveLearnSection visibility={toggleState === 5}>
          <H3>Learned when evolving</H3>
          <MoveText>
            Learned when the pokémon is evolving no matter its level. Data from
            Pokémon <span>{version.replace(/-/g, ` `)}</span>. These information
            may vary in other games. Check the respective pokédex pages for
            details.
          </MoveText>
          <MoveList>
            {pokedex?.map((p: Pokemon.Pokemon) =>
              p.moves?.map(
                (pm) =>
                  pm.move.name === move.name &&
                  pm.version_group_details?.map(
                    (pmv) =>
                      pmv.version_group.name === version &&
                      pmv.move_learn_method.name === `level-up` &&
                      pmv.level_learned_at === 0 && (
                        <li key={p.name}>
                          <Image
                            src={p.sprites.front_default}
                            alt={p.name}
                            width={96}
                            height={96}
                          />
                          <MoveLink
                            href={{
                              pathname: `/pokemon/[name]`,
                              query: { name: p.name },
                            }}
                            key={p.name}
                          >
                            {p.name.replace(/-/g, ` `)}
                          </MoveLink>
                          <MoveTypes>
                            {p.types?.map((pt) => (
                              <Type id={pt.type.name} key={pt.type.name}>
                                <Image
                                  alt={pt.type.name}
                                  width={15}
                                  height={15}
                                />
                                <span>{pt.type.name}</span>
                              </Type>
                            ))}
                          </MoveTypes>
                        </li>
                      ),
                  ),
              ),
            )}
          </MoveList>
        </MoveLearnSection>

        <Link href="/moves" passHref>
          <BackBtn name="Moves" />
        </Link>
      </MainBig>
    </>
  );
}

export default MoveCard;
