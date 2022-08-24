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
	text-align: center;

	& h4 {
		font-size: 2.5rem;
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
	margin: 3rem 0;

	& div {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		& h4 {
			font-size: 2.5rem;
			text-align: center;
			text-transform: capitalize;
		}

		& p {
			font-size: 1.3rem;
			text-align: center;
			text-transform: capitalize;
		}

		& span {
			font-size: 2rem;
		}
	}
`;