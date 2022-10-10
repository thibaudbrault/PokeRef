import React, { useState } from 'react';

import { CardTitle, H3, Subtitle } from '/components/BaseStyles/Headings';
import { MainBig } from '/components/BaseStyles/Sizing';
import Data from '/components/Moves/MoveCard/Data/Data.MoveCard';
import {
	MoveLearnSection,
	MoveLink,
	MoveList,
	MoveText,
	MoveTypes,
} from '/components/Moves/MoveCard/StyledMoveCard.js';
import { BackButton } from '/components/BaseStyles/Inputs';
import { Type } from '/components/BaseStyles/Themes';
import { useMachines, useMove, usePokedex } from '/helpers/DataFetch';
import Nav from '/components/Moves/MoveCard/Nav/Nav.MoveCard';
import Loader from '/components/Loader/Loader';
import { FaChevronLeft } from 'react-icons/fa';
import LearnMethod from '/helpers/LearnMethod.PokemonCard';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const MoveCard = () => {
	const router = useRouter();
	const { name } = router.query;

	// Import data fetch
	const {
		isLoading,
		error,
		data: move,
	} = useMove(`https://pokeapi.co/api/v2/move/${name}`);

	const { data: pokedex } = usePokedex(
		'https://pokeapi.co/api/v2/pokemon?limit=905'
	);

	const { data: machines } = useMachines();

	// Version of the returned data is from the latest available from PokéAPI
	const [version, setVersion] = useState('ultra-sun-ultra-moon');

	// Switch between the different tables for the method to learn the move
	const [toggleState, setToggleState] = useState(0);
	const toggleTable = (index) => {
		setToggleState(index);
	};

	if (error) {
		return <p>{error}</p>;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Head>
				<title>
					{name.charAt(0).toUpperCase() + name.slice(1)} | Moves | PokéRef
				</title>
				<meta name='description' content={`Find every details about ${name}`} />
				<meta property='og:title' content={`${name} | Moves | PokéRef`} />
				<meta
					property='og:description'
					content={`Find every details about ${name}`}
				/>
				<meta property='og:url' content={`https://pokeref.app/move/${name}`} />
				<meta property='og:type' content='website' />
			</Head>
			<MainBig>
				<CardTitle>{move?.name?.replace(/-/g, ' ')}</CardTitle>
				<Subtitle>{move?.generation?.name?.replace(/-/g, ' ')}</Subtitle>

				<Nav move={move} setVersion={setVersion} />

				<Data move={move} machines={machines} version={version} />

				<LearnMethod toggleState={toggleState} toggleTable={toggleTable} />

				<MoveLearnSection visibility={toggleState === 0}>
					<H3>Learned by leveling up</H3>
					<MoveText>
						Learned when the pokémon reach a ceratin level. Data from Pokémon{' '}
						<span>{version.replace(/-/g, ' ')}</span>. These information may
						vary in other games. Check the respective pokédex pages for details.
					</MoveText>
					<MoveList>
						{pokedex?.map((p) =>
							p?.moves?.map(
								(pm) =>
									pm?.move?.name === move?.name &&
									pm?.version_group_details?.map(
										(pmv) =>
											pmv?.version_group?.name === version &&
											pmv?.move_learn_method?.name === 'level-up' &&
											pmv?.level_learned_at > 1 && (
												<li>
													<Image
														src={p?.sprites?.front_default}
														alt={p?.name}
														width={96}
														height={96}
													/>
													<MoveLink
														href={{
															pathname: '/pokemon/[name]',
															query: { name: p.name },
														}}
														key={p?.name}
													>
														{p?.name.replace(/-/g, ' ')}
													</MoveLink>
													<p>Level {pmv?.level_learned_at}</p>
													<MoveTypes>
														{p?.types?.map((pt) => (
															<Type id={pt.type.name} key={pt.type.name}>
																<Image
																	alt={pt?.type?.name}
																	width={15}
																	height={15}
																/>
																<span>{pt?.type?.name}</span>
															</Type>
														))}
													</MoveTypes>
												</li>
											)
									)
							)
						)}
					</MoveList>
				</MoveLearnSection>

				<MoveLearnSection visibility={toggleState === 1}>
					<H3>Learned from a TM / HM</H3>
					<MoveText>
						Learned by using a TM or a HM. Data from Pokémon{' '}
						<span>{version.replace(/-/g, ' ')}</span>. These information may
						vary in other games. Check the respective pokédex pages for details.
					</MoveText>
					<MoveList>
						{pokedex?.map((p) =>
							p?.moves?.map(
								(pm) =>
									pm?.move?.name === move?.name &&
									pm?.version_group_details?.map(
										(pmv) =>
											pmv?.version_group?.name === version &&
											pmv?.move_learn_method?.name === 'machine' &&
											pmv?.level_learned_at === 0 && (
												<li>
													<Image
														src={p?.sprites?.front_default}
														alt={p?.name}
														width={96}
														height={96}
													/>
													<MoveLink
														href={{
															pathname: '/pokemon/[name]',
															query: { name: p.name },
														}}
														key={p?.name}
													>
														{p?.name.replace(/-/g, ' ')}
													</MoveLink>
													<MoveTypes>
														{p?.types?.map((pt) => (
															<Type id={pt.type.name} key={pt.type.name}>
																<Image
																	alt={pt?.type?.name}
																	width={15}
																	height={15}
																/>
																<span>{pt?.type?.name}</span>
															</Type>
														))}
													</MoveTypes>
												</li>
											)
									)
							)
						)}
					</MoveList>
				</MoveLearnSection>

				<MoveLearnSection visibility={toggleState === 2}>
					<H3>Learned from the move relearner / by breeding</H3>
					<MoveText>
						Learned via the move relearner or through breeding. Data from
						Pokémon <span>{version.replace(/-/g, ' ')}</span>. These information
						may vary in other games. Check the respective pokédex pages for
						details.
					</MoveText>
					<MoveList>
						{pokedex?.map((p) =>
							p?.moves?.map(
								(pm) =>
									pm?.move?.name === move?.name &&
									pm?.version_group_details?.map(
										(pmv) =>
											pmv?.version_group?.name === version &&
											(pmv?.move_learn_method?.name === 'egg' ||
												(pmv?.move_learn_method?.name === 'level-up' &&
													pmv?.level_learned_at === 1)) && (
												<li>
													<Image
														src={p?.sprites?.front_default}
														alt={p?.name}
														width={96}
														height={96}
													/>
													<MoveLink
														href={{
															pathname: '/pokemon/[name]',
															query: { name: p.name },
														}}
														key={p?.name}
													>
														{p?.name.replace(/-/g, ' ')}
													</MoveLink>
													<MoveTypes>
														{p?.types?.map((pt) => (
															<Type id={pt.type.name} key={pt.type.name}>
																<Image
																	alt={pt?.type?.name}
																	width={15}
																	height={15}
																/>
																<span>{pt?.type?.name}</span>
															</Type>
														))}
													</MoveTypes>
												</li>
											)
									)
							)
						)}
					</MoveList>
				</MoveLearnSection>

				<MoveLearnSection visibility={toggleState === 3}>
					<H3>Learned from the move tutor</H3>
					<MoveText>
						Learned by going to the move tutor. Data from Pokémon{' '}
						<span>{version.replace(/-/g, ' ')}</span>. These information may
						vary in other games. Check the respective pokédex pages for details.
					</MoveText>
					<MoveList>
						{pokedex?.map((p) =>
							p?.moves?.map(
								(pm) =>
									pm?.move?.name === move?.name &&
									pm?.version_group_details?.map(
										(pmv) =>
											pmv?.version_group?.name === version &&
											pmv?.move_learn_method?.name === 'tutor' && (
												<li>
													<Image
														src={p?.sprites?.front_default}
														alt={p?.name}
														width={96}
														height={96}
													/>
													<MoveLink
														href={{
															pathname: '/pokemon/[name]',
															query: { name: p.name },
														}}
														key={p?.name}
													>
														{p?.name.replace(/-/g, ' ')}
													</MoveLink>
													<MoveTypes>
														{p?.types?.map((pt) => (
															<Type id={pt.type.name} key={pt.type.name}>
																<Image
																	alt={pt?.type?.name}
																	width={15}
																	height={15}
																/>
																<span>{pt?.type?.name}</span>
															</Type>
														))}
													</MoveTypes>
												</li>
											)
									)
							)
						)}
					</MoveList>
				</MoveLearnSection>

				<MoveLearnSection visibility={toggleState === 5}>
					<H3>Learned when evolving</H3>
					<MoveText>
						Learned when the pokémon is evolving no matter its level. Data from
						Pokémon <span>{version.replace(/-/g, ' ')}</span>. These information
						may vary in other games. Check the respective pokédex pages for
						details.
					</MoveText>
					<MoveList>
						{pokedex?.map((p) =>
							p?.moves?.map(
								(pm) =>
									pm?.move?.name === move?.name &&
									pm?.version_group_details?.map(
										(pmv) =>
											pmv?.version_group?.name === version &&
											pmv?.move_learn_method?.name === 'level-up' &&
											pmv?.level_learned_at === 0 && (
												<li>
													<Image
														src={p?.sprites?.front_default}
														alt={p?.name}
														width={96}
														height={96}
													/>
													<MoveLink
														href={{
															pathname: '/pokemon/[name]',
															query: { name: p.name },
														}}
														key={p?.name}
													>
														{p?.name.replace(/-/g, ' ')}
													</MoveLink>
													<MoveTypes>
														{p?.types?.map((pt) => (
															<Type id={pt.type.name} key={pt.type.name}>
																<Image
																	alt={pt?.type?.name}
																	width={15}
																	height={15}
																/>
																<span>{pt?.type?.name}</span>
															</Type>
														))}
													</MoveTypes>
												</li>
											)
									)
							)
						)}
					</MoveList>
				</MoveLearnSection>

				<Link href='/moves' passHref>
					<BackButton>
						<FaChevronLeft /> Back to Moves
					</BackButton>
				</Link>
			</MainBig>
		</>
	);
};

export default MoveCard;
