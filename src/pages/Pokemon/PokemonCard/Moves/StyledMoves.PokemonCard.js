import styled from 'styled-components';

export const PokemonMovesSection = styled.section`
	padding-bottom: 5rem;
`;

export const PokemonMovesTd = styled.td`
	text-transform: capitalize;
`;

export const PokemonMovesMachine = styled.td`
	text-transform: uppercase;
`;

export const PokemonMovesEmpty = styled.td`
	font-size: 1.7rem;
	font-weight: 700;

	&:first-child {
		display: table-cell;
	}
`;
