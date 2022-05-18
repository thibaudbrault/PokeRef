import styled from 'styled-components';
import { device } from '../../../../components/BaseStyles/Sizing';
import { Table } from '../../../../components/BaseStyles/Table';

export const PokemonInfoSection = styled.section`
	padding-bottom: 5rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 4rem;

	@media ${device.sm} {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		& div {
			margin: 1rem 0;

			&:first-of-type {
				margin-top: 0;
			}

			&:last-of-type {
				margin-bottom: 0;
			}
		}
	}
`;

export const PokemonInfoTable = styled(Table)`
	width: 90%;
	
	& th {
		background: rgba(130, 130, 130, 0.2);
		text-transform: capitalize;
	}

	& td {
		font-size: 1.7rem;
		font-weight: 700;
		text-align: center;
		text-transform: capitalize;

		& a {
			display: inline-block;
			border-bottom: 1px solid transparent;
			transition: 0.3s ease-in-out;

			&:hover {
				border-bottom: 1px solid ${({ theme }) => theme.secondary};
			}
		}
	}
`;
