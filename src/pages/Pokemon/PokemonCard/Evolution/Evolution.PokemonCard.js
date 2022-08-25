import React from 'react';
import { H3 } from '../../../../components/BaseStyles/Headings';
import {
	PokemonEvolutionBase,
	PokemonEvolutionContainer,
	PokemonEvolutionElement,
	PokemonEvolutionFinal,
	PokemonEvolutionSection,
	PokemonEvolutionStages,
	PokemonEvolutionText,
} from './StyledEvolution.PokemonCard';
import { BsArrowRight } from 'react-icons/bs'

function Evolution({ evolution, pokemon }) {

console.log(evolution)

	return (
		<PokemonEvolutionSection>
			<H3>Evolution chain</H3>
			<PokemonEvolutionContainer>
				<PokemonEvolutionBase>
					<h4>{evolution?.chain?.species?.name}</h4>
				</PokemonEvolutionBase>
				<PokemonEvolutionStages>
					{evolution?.chain?.evolves_to?.length !== 0 ? (
						evolution?.chain?.evolves_to?.map((ee) => (
							<PokemonEvolutionElement>
								<div>
									{ee?.evolution_details?.map((eed) =>
										<>
											{eed?.gender != null &&
												(eed?.gender === 1
													? (<PokemonEvolutionText><span> Female</span></PokemonEvolutionText>)
													: (<PokemonEvolutionText><span> Male</span></PokemonEvolutionText>)
												)
											}
											{eed?.held_item != null && eed?.trigger?.name === 'trade' &&
												<PokemonEvolutionText>
													Trade holding
													<span> {eed?.held_item?.name?.replace(/-/g, ' ')}</span>
												</PokemonEvolutionText>
											}
											{eed?.held_item != null && eed?.trigger?.name === 'level-up' &&
												<PokemonEvolutionText>
													Level up holding <span> {eed?.held_item?.name?.replace(/-/g, ' ')}</span> during the <span> {eed?.time_fo_day}</span>
												</PokemonEvolutionText>
											}
											{eed?.item != null &&
												<PokemonEvolutionText>
													Use <span> {eed?.item?.name?.replace(/-/g, ' ')}</span>
												</PokemonEvolutionText>
											}
											{eed?.known_move != null &&
												<PokemonEvolutionText>
													Learn <span> {eed?.known_move?.name?.replace(/-/g, ' ')}</span>
												</PokemonEvolutionText>
											}
											{eed?.known_move_type != null && eed?.min_affection != null &&
												<PokemonEvolutionText>
													Level up with <span> {eed?.min_affection}+ affection</span> while knowing a <span> {eed?.known_move_type?.name?.replace(/-/g, ' ')}</span> type move
												</PokemonEvolutionText>
											}
											{eed?.known_move_type != null && eed?.min_happiness != null &&
												<PokemonEvolutionText>
													Level up with <span> {eed?.min_happiness}+ happiness</span> while knowing a <span> {eed?.known_move_type?.name?.replace(/-/g, ' ')}</span> type move
												</PokemonEvolutionText>
											}
											{eed?.location != null &&
												<PokemonEvolutionText>
													Level up at <span> {eed?.location?.name?.replace(/-/g, ' ')}</span>
												</PokemonEvolutionText>
											}
											{eed?.min_beauty != null &&
												<PokemonEvolutionText>
													Level up with <span> {eed?.min_beauty}+ beauty</span>
												</PokemonEvolutionText>
											}
											{eed?.min_happiness!= null && eed?.time_of_day !== '' &&
												<PokemonEvolutionText>
													Level up with <span> {eed?.min_happiness}+ happiness</span> during the <span> {eed?.time_of_day}</span>
												</PokemonEvolutionText>
											}
											{eed?.min_happiness!= null && eed?.time_of_day === '' &&
												<PokemonEvolutionText>
													Level up with <span> {eed?.min_happiness}+ happiness</span>
												</PokemonEvolutionText>
											}
											{eed?.min_level != null && eed?.time_of_day === '' && eed?.party_type === null && eed?.relative_physical_stats === null && eed?.turn_upside_down === false &&
												<PokemonEvolutionText>
													Level <span> {eed?.min_level}</span>
												</PokemonEvolutionText>
											}
											{eed?.min_level != null && eed?.time_of_day !== '' &&
												<PokemonEvolutionText>
													Level <span> {eed?.min_level}</span> during the <span> {eed?.time_of_day}</span>
												</PokemonEvolutionText>
											}
											{eed?.need_overwolrd_rain === true &&
												<PokemonEvolutionText>
													Level <span> {eed?.min_level}</span> while <span>raining</span>
												</PokemonEvolutionText>
											}
											{eed?.party_species != null &&
												<PokemonEvolutionText>
													Level up with a <span> {eed?.party_species?.name?.replace(/-/g, ' ')}</span> in the party
												</PokemonEvolutionText>
											}
											{eed?.party_type != null &&
												<PokemonEvolutionText>
													Level <span> {eed?.min_level}</span> with a <span> {eed?.party_type?.name}</span> type pokémon in the party
												</PokemonEvolutionText>
											}
											{eed?.relative_physical_stats != null &&
												<PokemonEvolutionText>
													Level <span> {eed?.min_level}</span> with
													<span>
														{eed?.relative_physical_stats === 1 ? (
															' Attack > Defense'
														) : (
															eed?.relative_physical_stats === 0 ? (
																' Attack = Defense'
															) : (
																' Defense > Attack'
															)
														)}
													</span>
												</PokemonEvolutionText>
											}
											{eed?.trade_species != null &&
												<PokemonEvolutionText>
													Trade with <span> {eed?.trade_species?.name}</span>
												</PokemonEvolutionText>
											}
											{eed?.turn_upside_down === true &&
												<PokemonEvolutionText>
													Level <span> {eed?.min_level} </span> while <span>holding the console upside-down</span>
												</PokemonEvolutionText>
											}
											{eed?.trigger?.name === 'shed' && 
												<PokemonEvolutionText>
													Level <span>20</span> with an <span>empty slot in the party</span> and an <span>extra PokéBall</span>
												</PokemonEvolutionText>
											}
											{eed?.trigger?.name === 'take-damage' &&
												<PokemonEvolutionText>
													Travel <span>under the stone bridge in Dusty Bowl</span> after taking at least <span>49 HP in damage</span> without fainting
												</PokemonEvolutionText>
											}
										</>
									)}
									<BsArrowRight />
								</div>
								<div>
									<h4>{ee?.species?.name?.replace(/-/g, ' ')}</h4>
								</div>
							</PokemonEvolutionElement>
						))
					) : (
						null
					)}
				</PokemonEvolutionStages>
				<PokemonEvolutionFinal>
					{evolution?.chain?.evolves_to?.map((ee) =>
						ee?.evolves_to?.length !== 0 ? (
							ee?.evolves_to?.map((eee) => (
								<PokemonEvolutionStages>
									<PokemonEvolutionElement>
										<div>
											<BsArrowRight />
										</div>
										<div>
											<h4>{eee?.species?.name?.replace(/-/g, ' ')}</h4>
										</div>
									</PokemonEvolutionElement>
								</PokemonEvolutionStages>
							))
						) : (
							null
						)
					)}
				</PokemonEvolutionFinal>
			</PokemonEvolutionContainer>
		</PokemonEvolutionSection>
	);
}

export default Evolution;
