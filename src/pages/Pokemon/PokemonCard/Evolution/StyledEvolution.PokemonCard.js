import styled from 'styled-components';

export const PokemonEvolutionSection = styled.section`
	padding-bottom: 5rem;
`;

export const PokemonEvolutionContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

export const PokemonEvolutionBase = styled.div`
	width: 100%;

	& p {
		font-size: 2rem;
		text-transform: capitalize;
	}
`;

export const PokemonEvolutionStages = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const PokemonEvolutionElement = styled.div`
	display: flex;
	justify-content: space-between;
	
	& span {
		font-size: 2rem;
	}

	& div {
		width: 100%;
		& p {
			font-size: 2rem;
			text-align: center;
			text-transform: capitalize;
		}
	}
`;