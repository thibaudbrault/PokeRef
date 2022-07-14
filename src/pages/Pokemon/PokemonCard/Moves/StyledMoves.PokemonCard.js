import styled from 'styled-components';
import { device } from '../../../../components/BaseStyles/Sizing';
import { Table } from '../../../../components/BaseStyles/Table';

export const PokemonMovesSection = styled.section`
	padding-bottom: 5rem;
	overflow-x: hidden;
`;

export const PokemonMovesTable = styled(Table)`
	width: 100%;
	& td {
		@media ${device.sm} {
			font-size: 1.7rem;
		}
	}
`;

export const PokemonMovesTd = styled.td`
	text-transform: capitalize;

	& img {
		display: inline-block;
	}
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
