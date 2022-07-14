import React from 'react';
import { H3 } from '../../../../components/BaseStyles/Headings';
import {
	PokemonEvolutionContainer,
	PokemonEvolutionSection,
} from './StyledEvolution.PokemonCard';

function Evolution({ evolution, pokemon }) {

console.log(pokemon)

	return (
		<PokemonEvolutionSection>
			<H3>Evolution chain</H3>
			<PokemonEvolutionContainer>
				<div>
					<p>{evolution?.chain?.species?.name}</p>
				</div>
				{evolution?.chain?.evolves_to?.map((ee) => (
					<>
						<div>→</div>
						<div>
							<p>{ee?.species?.name}</p>
						</div>
					</>
				))}
				{evolution?.chain?.evolves_to?.map((ee) =>
					ee?.evolves_to?.map((eee) => (
						<>
							<div>→</div>
							<div>
								<p>{eee?.species?.name}</p>
							</div>
						</>
					))
				)}
			</PokemonEvolutionContainer>
		</PokemonEvolutionSection>
	);
}

export default Evolution;
