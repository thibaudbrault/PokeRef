import React from 'react';
import { H3 } from '../../../../components/BaseStyles/Headings';
import {
	PokemonEvolutionBase,
	PokemonEvolutionContainer,
	PokemonEvolutionElement,
	PokemonEvolutionSection,
	PokemonEvolutionStages,
} from './StyledEvolution.PokemonCard';

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
					{evolution?.chain?.evolves_to?.map((ee) => (
						<PokemonEvolutionElement>
							<div>
								{ee?.evolution_details?.[0]?.gender != null &&
									(ee?.evolution_details?.[0]?.gender === 1 
										? (<p>Female</p>)
										: (<p>Male</p>)
									)
								}
								{ee?.evolution_details?.[0]?.held_item != null &&
									<p>{ee?.evolution_details?.[0]?.held_item?.name?.replace(/-/g, ' ')}</p>
								}
								{ee?.evolution_details?.[0]?.item != null &&
									<p>{ee?.evolution_details?.[0]?.item?.name?.replace(/-/g, ' ')}</p>
								}
								<span>→</span>
							</div>
							<div>
								<h4>{ee?.species?.name?.replace(/-/g, ' ')}</h4>
							</div>
						</PokemonEvolutionElement>
					))}
				</PokemonEvolutionStages>
				{evolution?.chain?.evolves_to?.map((ee) =>
					ee?.evolves_to?.length !== 0 ?
						(ee?.evolves_to?.map((eee) => (
							<PokemonEvolutionStages>
								<PokemonEvolutionElement>
									<div>
										<span>→</span>
									</div>
									<div>
										<h4>{eee?.species?.name?.replace(/-/g, ' ')}</h4>
									</div>
								</PokemonEvolutionElement>
							</PokemonEvolutionStages>
						)))
							: (
								null
							)
					)}
			</PokemonEvolutionContainer>
		</PokemonEvolutionSection>
	);
}

export default Evolution;
