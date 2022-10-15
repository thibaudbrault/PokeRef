import React from 'react';
import { H3 } from '/components/BaseStyles/Headings';
import {
	PokemonEvolution,
	PokemonEvolutionBase,
	PokemonEvolutionContainer,
	PokemonEvolutionElement,
	PokemonEvolutionFinal,
	PokemonEvolutionSection,
	PokemonEvolutionStages,
	PokemonEvolutionText,
} from './StyledEvolution.PokemonCard';
import FaChevronRight from '@meronex/icons/fa/FaChevronRight';
import { usePokedex } from '/helpers/DataFetch';
import SmallLoader from '/components/Loader/SmallLoader';
import Image from 'next/image';
import Link from 'next/link';

function Evolution({ evolution, pokemon }) {
	const {
		isLoading,
		error,
		data: pokedex,
	} = usePokedex(`https://pokeapi.co/api/v2/pokemon?limit=898`);

	if (error) {
		return <p>{error}</p>;
	}

	if (isLoading) {
		return <SmallLoader />;
	}

	return (
		<PokemonEvolutionSection>
			<H3>Evolution chain</H3>
			<PokemonEvolutionContainer>
				<PokemonEvolutionBase>
					<div>
						{pokedex.map((p) =>
							p?.name === evolution?.chain?.species?.name ? (
								<Image
									src={p?.sprites?.front_default}
									alt=''
									width={96}
									height={96}
								/>
							) : null
						)}
						<Link
							href={{
								pathname: '/pokemon/[name]',
								query: { name: evolution?.chain?.species?.name },
							}}
						>
							{evolution?.chain?.species?.name}
						</Link>
					</div>
				</PokemonEvolutionBase>
				{evolution?.chain?.evolves_to?.length !== 0 ? (
					<PokemonEvolution>
						<PokemonEvolutionStages>
							{evolution?.chain?.evolves_to?.map((ee) => (
								<PokemonEvolutionElement key={evolution.chain.species.name}>
									<div>
										{ee?.evolution_details?.map((eed) => (
											<>
												{eed?.gender != null &&
													(eed?.gender === 1 ? (
														<PokemonEvolutionText>
															<span> Female</span>
														</PokemonEvolutionText>
													) : (
														<PokemonEvolutionText>
															<span> Male</span>
														</PokemonEvolutionText>
													))}
												{eed?.held_item != null &&
													eed?.trigger?.name === 'trade' && (
														<PokemonEvolutionText>
															Trade holding
															<span>
																{' '}
																{eed?.held_item?.name?.replace(/-/g, ' ')}
															</span>
														</PokemonEvolutionText>
													)}
												{eed?.held_item != null &&
													eed?.trigger?.name === 'level-up' && (
														<PokemonEvolutionText>
															Level up holding{' '}
															<span>
																{' '}
																{eed?.held_item?.name?.replace(/-/g, ' ')}
															</span>{' '}
															during the <span> {eed?.time_fo_day}</span>
														</PokemonEvolutionText>
													)}
												{eed?.item != null && (
													<PokemonEvolutionText>
														Use{' '}
														<span> {eed?.item?.name?.replace(/-/g, ' ')}</span>
													</PokemonEvolutionText>
												)}
												{eed?.known_move != null && (
													<PokemonEvolutionText>
														Learn{' '}
														<span>
															{' '}
															{eed?.known_move?.name?.replace(/-/g, ' ')}
														</span>
													</PokemonEvolutionText>
												)}
												{eed?.known_move_type != null &&
													eed?.min_affection != null && (
														<PokemonEvolutionText>
															Level up with{' '}
															<span> {eed?.min_affection}+ affection</span>{' '}
															while knowing a{' '}
															<span>
																{' '}
																{eed?.known_move_type?.name?.replace(/-/g, ' ')}
															</span>{' '}
															type move
														</PokemonEvolutionText>
													)}
												{eed?.known_move_type != null &&
													eed?.min_happiness != null && (
														<PokemonEvolutionText>
															Level up with{' '}
															<span> {eed?.min_happiness}+ happiness</span>{' '}
															while knowing a{' '}
															<span>
																{' '}
																{eed?.known_move_type?.name?.replace(/-/g, ' ')}
															</span>{' '}
															type move
														</PokemonEvolutionText>
													)}
												{eed?.location != null && (
													<PokemonEvolutionText>
														Level up at{' '}
														<span>
															{' '}
															{eed?.location?.name?.replace(/-/g, ' ')}
														</span>
													</PokemonEvolutionText>
												)}
												{eed?.min_beauty != null && (
													<PokemonEvolutionText>
														Level up with{' '}
														<span> {eed?.min_beauty}+ beauty</span>
													</PokemonEvolutionText>
												)}
												{eed?.min_happiness != null && eed?.time_of_day !== '' && (
													<PokemonEvolutionText>
														Level up with{' '}
														<span> {eed?.min_happiness}+ happiness</span> during
														the <span> {eed?.time_of_day}</span>
													</PokemonEvolutionText>
												)}
												{eed?.min_happiness != null && eed?.time_of_day === '' && (
													<PokemonEvolutionText>
														Level up with{' '}
														<span> {eed?.min_happiness}+ happiness</span>
													</PokemonEvolutionText>
												)}
												{eed?.min_level != null &&
													eed?.time_of_day === '' &&
													eed?.party_type === null &&
													eed?.relative_physical_stats === null &&
													eed?.turn_upside_down === false && (
														<PokemonEvolutionText>
															Level <span> {eed?.min_level}</span>
														</PokemonEvolutionText>
													)}
												{eed?.min_level != null && eed?.time_of_day !== '' && (
													<PokemonEvolutionText>
														Level <span> {eed?.min_level}</span> during the{' '}
														<span> {eed?.time_of_day}</span>
													</PokemonEvolutionText>
												)}
												{eed?.need_overwolrd_rain === true && (
													<PokemonEvolutionText>
														Level <span> {eed?.min_level}</span> while{' '}
														<span>raining</span>
													</PokemonEvolutionText>
												)}
												{eed?.party_species != null && (
													<PokemonEvolutionText>
														Level up with a{' '}
														<span>
															{' '}
															{eed?.party_species?.name?.replace(/-/g, ' ')}
														</span>{' '}
														in the party
													</PokemonEvolutionText>
												)}
												{eed?.party_type != null && (
													<PokemonEvolutionText>
														Level <span> {eed?.min_level}</span> with a{' '}
														<span> {eed?.party_type?.name}</span> type pokémon
														in the party
													</PokemonEvolutionText>
												)}
												{eed?.relative_physical_stats != null && (
													<PokemonEvolutionText>
														Level <span> {eed?.min_level}</span> with
														<span>
															{eed?.relative_physical_stats === 1
																? ' Attack > Defense'
																: eed?.relative_physical_stats === 0
																	? ' Attack = Defense'
																	: ' Defense > Attack'}
														</span>
													</PokemonEvolutionText>
												)}
												{eed?.trade_species != null && (
													<PokemonEvolutionText>
														Trade with <span> {eed?.trade_species?.name}</span>
													</PokemonEvolutionText>
												)}
												{eed?.turn_upside_down === true && (
													<PokemonEvolutionText>
														Level <span> {eed?.min_level} </span> while{' '}
														<span>holding the console upside-down</span>
													</PokemonEvolutionText>
												)}
												{eed?.trigger?.name === 'shed' && (
													<PokemonEvolutionText>
														Level <span>20</span> with an{' '}
														<span>empty slot in the party</span> and an{' '}
														<span>extra PokéBall</span>
													</PokemonEvolutionText>
												)}
												{eed?.trigger?.name === 'take-damage' && (
													<PokemonEvolutionText>
														Travel{' '}
														<span>under the stone bridge in Dusty Bowl</span>{' '}
														after taking at least <span>49 HP in damage</span>{' '}
														without fainting
													</PokemonEvolutionText>
												)}
											</>
										))}
										<FaChevronRight />
									</div>
									<div>
										{pokedex.map((p) =>
											p?.name === ee?.species?.name ? (
												<Image
													src={p?.sprites?.front_default}
													alt=''
													width={96}
													height={96}
												/>
											) : null
										)}
										<Link
											href={{
												pathname: '/pokemon/[name]',
												query: { name: ee.species.name },
											}}
										>
											{ee?.species?.name?.replace(/-/g, ' ')}
										</Link>
									</div>
								</PokemonEvolutionElement>
							))}
						</PokemonEvolutionStages>
						{evolution?.chain?.evolves_to?.map((ee) =>
							ee?.evolves_to?.length !== 0 ? (
								<PokemonEvolutionFinal>
									{ee?.evolves_to?.map((eee) => (
										<PokemonEvolutionStages key={ee.species.name}>
											<PokemonEvolutionElement>
												<div>
													{eee?.evolution_details?.map((eeed) => (
														<>
															{eeed?.gender != null &&
																(eeed?.gender === 1 ? (
																	<PokemonEvolutionText>
																		<span> Female</span>
																	</PokemonEvolutionText>
																) : (
																	<PokemonEvolutionText>
																		<span> Male</span>
																	</PokemonEvolutionText>
																))}
															{eeed?.held_item != null &&
																eeed?.trigger?.name === 'trade' && (
																	<PokemonEvolutionText>
																		Trade holding
																		<span>
																			{' '}
																			{eeed?.held_item?.name?.replace(
																				/-/g,
																				' '
																			)}
																		</span>
																	</PokemonEvolutionText>
																)}
															{eeed?.held_item != null &&
																eeed?.trigger?.name === 'level-up' && (
																	<PokemonEvolutionText>
																		Level up holding{' '}
																		<span>
																			{' '}
																			{eeed?.held_item?.name?.replace(
																				/-/g,
																				' '
																			)}
																		</span>{' '}
																		during the <span> {eeed?.time_fo_day}</span>
																	</PokemonEvolutionText>
																)}
															{eeed?.item != null && (
																<PokemonEvolutionText>
																	Use{' '}
																	<span>
																		{' '}
																		{eeed?.item?.name?.replace(/-/g, ' ')}
																	</span>
																</PokemonEvolutionText>
															)}
															{eeed?.known_move != null && (
																<PokemonEvolutionText>
																	Learn{' '}
																	<span>
																		{' '}
																		{eeed?.known_move?.name?.replace(/-/g, ' ')}
																	</span>
																</PokemonEvolutionText>
															)}
															{eeed?.known_move_type != null &&
																eeed?.min_affection != null && (
																	<PokemonEvolutionText>
																		Level up with{' '}
																		<span>
																			{' '}
																			{eeed?.min_affection}+ affection
																		</span>{' '}
																		while knowing a{' '}
																		<span>
																			{' '}
																			{eeed?.known_move_type?.name?.replace(
																				/-/g,
																				' '
																			)}
																		</span>{' '}
																		type move
																	</PokemonEvolutionText>
																)}
															{eeed?.known_move_type != null &&
																eeed?.min_happiness != null && (
																	<PokemonEvolutionText>
																		Level up with{' '}
																		<span>
																			{' '}
																			{eeed?.min_happiness}+ happiness
																		</span>{' '}
																		while knowing a{' '}
																		<span>
																			{' '}
																			{eeed?.known_move_type?.name?.replace(
																				/-/g,
																				' '
																			)}
																		</span>{' '}
																		type move
																	</PokemonEvolutionText>
																)}
															{eeed?.location != null && (
																<PokemonEvolutionText>
																	Level up at{' '}
																	<span>
																		{' '}
																		{eeed?.location?.name?.replace(/-/g, ' ')}
																	</span>
																</PokemonEvolutionText>
															)}
															{eeed?.min_beauty != null && (
																<PokemonEvolutionText>
																	Level up with{' '}
																	<span> {eeed?.min_beauty}+ beauty</span>
																</PokemonEvolutionText>
															)}
															{eeed?.min_happiness != null &&
																eeed?.time_of_day !== '' && (
																	<PokemonEvolutionText>
																		Level up with{' '}
																		<span>
																			{' '}
																			{eeed?.min_happiness}+ happiness
																		</span>{' '}
																		during the <span> {eeed?.time_of_day}</span>
																	</PokemonEvolutionText>
																)}
															{eeed?.min_happiness != null &&
																eeed?.time_of_day === '' && (
																	<PokemonEvolutionText>
																		Level up with{' '}
																		<span>
																			{' '}
																			{eeed?.min_happiness}+ happiness
																		</span>
																	</PokemonEvolutionText>
																)}
															{eeed?.min_level != null &&
																eeed?.time_of_day === '' &&
																eeed?.party_type === null &&
																eeed?.relative_physical_stats === null &&
																eeed?.turn_upside_down === false && (
																	<PokemonEvolutionText>
																		Level <span> {eeed?.min_level}</span>
																	</PokemonEvolutionText>
																)}
															{eeed?.min_level != null &&
																eeed?.time_of_day !== '' && (
																	<PokemonEvolutionText>
																		Level <span> {eeed?.min_level}</span> during
																		the <span> {eeed?.time_of_day}</span>
																	</PokemonEvolutionText>
																)}
															{eeed?.need_overwolrd_rain === true && (
																<PokemonEvolutionText>
																	Level <span> {eeed?.min_level}</span> while{' '}
																	<span>raining</span>
																</PokemonEvolutionText>
															)}
															{eeed?.party_species != null && (
																<PokemonEvolutionText>
																	Level up with a{' '}
																	<span>
																		{' '}
																		{eeed?.party_species?.name?.replace(
																			/-/g,
																			' '
																		)}
																	</span>{' '}
																	in the party
																</PokemonEvolutionText>
															)}
															{eeed?.party_type != null && (
																<PokemonEvolutionText>
																	Level <span> {eeed?.min_level}</span> with a{' '}
																	<span> {eeed?.party_type?.name}</span> type
																	pokémon in the party
																</PokemonEvolutionText>
															)}
															{eeed?.relative_physical_stats != null && (
																<PokemonEvolutionText>
																	Level <span> {eeed?.min_level}</span> with
																	<span>
																		{eeed?.relative_physical_stats === 1
																			? ' Attack > Defense'
																			: eeed?.relative_physical_stats === 0
																				? ' Attack = Defense'
																				: ' Defense > Attack'}
																	</span>
																</PokemonEvolutionText>
															)}
															{eeed?.trade_species != null && (
																<PokemonEvolutionText>
																	Trade with{' '}
																	<span> {eeed?.trade_species?.name}</span>
																</PokemonEvolutionText>
															)}
															{eeed?.turn_upside_down === true && (
																<PokemonEvolutionText>
																	Level <span> {eeed?.min_level} </span> while{' '}
																	<span>holding the console upside-down</span>
																</PokemonEvolutionText>
															)}
															{eeed?.trigger?.name === 'shed' && (
																<PokemonEvolutionText>
																	Level <span>20</span> with an{' '}
																	<span>empty slot in the party</span> and an{' '}
																	<span>extra PokéBall</span>
																</PokemonEvolutionText>
															)}
															{eeed?.trigger?.name === 'take-damage' && (
																<PokemonEvolutionText>
																	Travel{' '}
																	<span>
																		under the stone bridge in Dusty Bowl
																	</span>{' '}
																	after taking at least{' '}
																	<span>49 HP in damage</span> without fainting
																</PokemonEvolutionText>
															)}
														</>
													))}
													<FaChevronRight />
												</div>
												<div>
													{pokedex.map((p) =>
														p?.name === eee?.species?.name ? (
															<Image
																src={p?.sprites?.front_default}
																alt=''
																width={96}
																height={96}
															/>
														) : null
													)}
													<Link
														href={{
															pathname: '/pokemon/[name]',
															query: { name: eee.species.name },
														}}
													>
														{eee?.species?.name?.replace(/-/g, ' ')}
													</Link>
												</div>
											</PokemonEvolutionElement>
										</PokemonEvolutionStages>
									))}
								</PokemonEvolutionFinal>
							) : null
						)}
					</PokemonEvolution>
				) : null}
			</PokemonEvolutionContainer>
		</PokemonEvolutionSection>
	);
}

export default Evolution;
