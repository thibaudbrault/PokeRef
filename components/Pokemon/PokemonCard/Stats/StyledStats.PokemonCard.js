import styled from 'styled-components';
import { device } from '../../../../components/BaseStyles/Sizing';
import { PokemonInfoTable } from '../Info/StyledInfo.PokemonCard';

export const PokemonStatsSection = styled.section`
	margin-bottom: 5rem;
	display: grid;
	grid-template-columns: 2fr 1fr;
	column-gap: 2rem;

	@media ${device.sm} {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
`;

export const PokemonStatsText = styled.td`
	padding: 1rem;
	font-size: 1.5rem;
	text-transform: capitalize;
	vertical-align: middle;
`;

export const PokemonStatsBars = styled.td`
	width: 100%;
	min-width: 150px;
	vertical-align: middle;

	& div {
		position: relative;
		width: 100%;
		height: 12px;
		background: ${({ theme }) => theme.main};
		border: 1px solid ${({ theme }) => theme.secondary};
		border-radius: 40px;

		& span {
			max-width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			height: 10px;
			background: ${({ theme }) => theme.secondary};
			border-radius: 40px;
		}
	}
`;

export const PokemonStatsTotal = styled.td`
	padding: 1rem;
	font-size: 1.5rem;
	font-weight: 700;
	vertical-align: middle;
`;

export const PokemonTypesContainer = styled.div`
	@media ${device.sm} {
		width: 100%;
		margin-top: 1rem;
	}
`;

export const PokemonTypesTable = styled(PokemonInfoTable)`
	display: ${(props) => (props.visibility ? 'table' : 'none')};
`;
