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

console.log(pokemon)

	return (
		<PokemonEvolutionSection>
			<H3>Evolution chain</H3>
			<PokemonEvolutionContainer>
				<PokemonEvolutionBase>
					<p>{evolution?.chain?.species?.name}</p>
				</PokemonEvolutionBase>
				<PokemonEvolutionStages>
					{evolution?.chain?.evolves_to?.map((ee) => (
						<PokemonEvolutionElement>
							<span>→</span>
							<div>
								<p>{ee?.species?.name?.replace(/-/g, ' ')}</p>
							</div>
						</PokemonEvolutionElement>
					))}
				</PokemonEvolutionStages>
				<PokemonEvolutionStages>
					{evolution?.chain?.evolves_to?.map((ee) =>
						ee?.evolves_to?.map((eee) => (
							<PokemonEvolutionElement>
								<span>→</span>
								<div>
									<p>{eee?.species?.name?.replace(/-/g, ' ')}</p>
								</div>
							</PokemonEvolutionElement>
						))
					)}
				</PokemonEvolutionStages>
			</PokemonEvolutionContainer>
		</PokemonEvolutionSection>
	);
}

export default Evolution;
