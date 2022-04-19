import React from 'react';
import { H3 } from '../../../../components/BaseStyles/Headings';
import {
	PokemonEvolutionContainer,
	PokemonEvolutionSection,
} from './StyledEvolution.PokemonCard';

function Evolution({ evolution }) {
	return (
		<PokemonEvolutionSection>
			<H3>Evolution chain</H3>
			<PokemonEvolutionContainer>
				<div>{evolution?.chain?.species?.name}</div>
				{evolution?.chain?.evolves_to?.map((ee) => (
					<>
						<div>→</div>
						<div>{ee?.species?.name}</div>
					</>
				))}
				{evolution?.chain?.evolves_to?.map((ee) =>
					ee?.evolves_to?.map((eee) => (
						<>
							<div>→</div>
							<div>{eee?.species?.name}</div>
						</>
					))
				)}
			</PokemonEvolutionContainer>
		</PokemonEvolutionSection>
	);
}

export default Evolution;
