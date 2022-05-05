import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Method from '../../../components/Method/Method';

import {
	CardTitle,
	H3,
	Subtitle,
} from '../../../components/BaseStyles/Headings';
import { MainBig } from '../../../components/BaseStyles/Sizing';
import Data from './Data/Data.MoveCard';
import {
	MoveLearnSection,
	MoveLink,
	MoveList,
	MoveText,
	MoveTypes,
} from './StyledMoveCard';
import { BackButton } from '../../../components/BaseStyles/Inputs';
import { Type } from '../../../components/BaseStyles/Themes';
import { useMachines, useMove, usePokedex } from '../../../helpers/DataFetch';
import Nav from './Nav/Nav.MoveCard';

const MoveCard = () => {
	const { name } = useParams();
	const navigate = useNavigate();

	// Import data fetch

	const { move, loading } = useMove(`https://pokeapi.co/api/v2/move/${name}`);

	const { pokedex } = usePokedex('https://pokeapi.co/api/v2/pokemon?limit=898');

	const { machines } = useMachines(
		'https://pokeapi.co/api/v2/machine?limit=1700'
	);

	// Data from latest gen available with PokeApi

	const [version, setVersion] = useState('ultra-sun-ultra-moon');

	// Toggle for moves table

	const [toggleState, setToggleState] = useState(1);
	const toggleTable = (index) => {
		setToggleState(index);
	};

	// Modify title of the page

	const title = `${name.replace(/-/g, ' ')}`;

	useEffect(() => {
		document.title = `${
			title.charAt(0).toUpperCase() + title.slice(1)
		} | Moves | PokéInfo`;
	}, [title]);

	return (
		<MainBig>
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					<CardTitle>{move?.name?.replace(/-/g, ' ')}</CardTitle>
					<Subtitle>{move?.generation?.name?.replace(/-/g, ' ')}</Subtitle>

					<Nav move={move} setVersion={setVersion} />

					<Data move={move} machines={machines} version={version} />

					<Method toggleState={toggleState} toggleTable={toggleTable} />

					<MoveLearnSection visibility={toggleState === 1}>
						<H3>Learned by leveling up</H3>
						<MoveText>
							Learned when the pokémon reach a ceratin level. Data from Pokémon{' '}
							<span>{version.replace(/-/g, ' ')}</span>. These informations may
							vary in other games. Check the respective pokédex pages for
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
												pmv?.level_learned_at > 1 && (
													<li>
														<img
															src={p?.sprites?.front_default}
															alt={p?.name}
														/>
														<MoveLink to={`/pokemon/${p?.name}`} key={p?.name}>
															{p?.name.replace(/-/g, ' ')}
														</MoveLink>
														<p>Level {pmv?.level_learned_at}</p>
														<MoveTypes>
															{p?.types?.map((pt) => (
																<Type id={pt.type.name}>
																	<img alt={pt?.type?.name} />
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
						<H3>Learned from a TM / HM</H3>
						<MoveText>
							Learned by using a TM or a HM. Data from Pokémon{' '}
							<span>{version.replace(/-/g, ' ')}</span>. These informations may
							vary in other games. Check the respective pokédex pages for
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
												pmv?.move_learn_method?.name === 'machine' &&
												pmv?.level_learned_at === 0 && (
													<li>
														<img
															src={p?.sprites?.front_default}
															alt={p?.name}
														/>
														<MoveLink to={`/pokemon/${p?.name}`} key={p?.name}>
															{p?.name.replace(/-/g, ' ')}
														</MoveLink>
														<MoveTypes>
															{p?.types?.map((pt) => (
																<Type id={pt.type.name}>
																	<img alt={pt?.type?.name} />
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
						<H3>Learned from the move relearner / by breeding</H3>
						<MoveText>
							Learned via the move relearner or through breeeding. Data from
							Pokémon <span>{version.replace(/-/g, ' ')}</span>. These
							informations may vary in other games. Check the respective pokédex
							pages for details.
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
														<img
															src={p?.sprites?.front_default}
															alt={p?.name}
														/>
														<MoveLink to={`/pokemon/${p?.name}`} key={p?.name}>
															{p?.name.replace(/-/g, ' ')}
														</MoveLink>
														<MoveTypes>
															{p?.types?.map((pt) => (
																<Type id={pt.type.name}>
																	<img alt={pt?.type?.name} />
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

					<MoveLearnSection visibility={toggleState === 4}>
						<H3>Learned from the move tutor</H3>
						<MoveText>
							Learned by going to the move tutor. Data from Pokémon{' '}
							<span>{version.replace(/-/g, ' ')}</span>. These informations may
							vary in other games. Check the respective pokédex pages for
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
												pmv?.move_learn_method?.name === 'tutor' && (
													<li>
														<img
															src={p?.sprites?.front_default}
															alt={p?.name}
														/>
														<MoveLink to={`/pokemon/${p?.name}`} key={p?.name}>
															{p?.name.replace(/-/g, ' ')}
														</MoveLink>
														<MoveTypes>
															{p?.types?.map((pt) => (
																<Type id={pt.type.name}>
																	<img alt={pt?.type?.name} />
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
							Learned when the pokémon is evolving no matter its level. Data
							from Pokémon <span>{version.replace(/-/g, ' ')}</span>. These
							informations may vary in other games. Check the respective pokédex
							pages for details.
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
														<img
															src={p?.sprites?.front_default}
															alt={p?.name}
														/>
														<MoveLink
															to={`/pokemon/${p?.name}`}
															key={p?.name}
															MoveList
														>
															{p?.name.replace(/-/g, ' ')}
														</MoveLink>
														<MoveTypes>
															{p?.types?.map((pt) => (
																<Type id={pt.type.name}>
																	<img alt={pt?.type?.name} />
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

					<BackButton onClick={() => navigate('/moves')}>
						{' '}
						ᐸ Back to moves
					</BackButton>
				</>
			)}
		</MainBig>
	);
};

export default MoveCard;
