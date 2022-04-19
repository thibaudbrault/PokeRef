import styled from 'styled-components';
import { Subtitle } from '../../../components/BaseStyles/Headings';
import { Table, TName } from '../../../components/BaseStyles/Table';

export const TypeDamageSection = styled.section`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 3rem;
`;

export const TypeDamageTable = styled(Table)`
	margin: 0.5rem 0 5rem;

	& th {
		width: 25%;
		background: rgba(130, 130, 130, 0.2);
		font-size: 1.5rem;
	}

	& td {
		background: none !important;
		text-align: center;

		& img {
			width: 32px;
			height: 32px;
			transition: 0.3s ease-in-out;
			&:hover {
				transform: scale(1.05);
			}
		}

		&:hover {
			background: rgba(130, 130, 130, 0.2);
		}
	}
`;

export const TypeListSection = styled.section`
	padding: 5rem 0;
`;

export const TypeListSubtitle = styled(Subtitle)`
	text-transform: none;
`;

export const TypePokemonList = styled.ul`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;

	& li {
		width: 14rem;
		height: 21rem;
		margin: 3rem;
		padding: 2rem 3rem;
		@include flex;
		flex-direction: column;
		background: rgba(255, 255, 255, 0.4);
		border-radius: 10px;
		text-align: center;
		border: 1px solid transparent;
		transition: 0.3s ease-in-out;

		& img {
			width: 96px;
			height: 96px;
			margin: 0 auto;
		}

		& p {
			font-size: 1.3rem;
		}

		& a {
			font-size: 1.7rem;
			font-weight: 700;
			text-transform: capitalize;
			transition: 0.3s ease-in-out;
		}

		&:hover {
			border: 1px solid ${({ theme }) => theme.red};
		}

		&:hover > & a {
			color: ${({ theme }) => theme.red};
		}
	}
`;

export const TypeMovesTable = styled(Table)`
	margin-top: 3rem;
`;

export const TypeMovesName = styled(TName)`
	cursor: pointer;
`;

export const TypeMovesData = styled.td`
	text-align: center;
`;

export const TypeMovesComment = styled.p`
	text-align: center;
	font-size: 1.3rem;
	margin: 0.75rem 0 0;
`;
