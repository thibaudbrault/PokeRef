import styled from 'styled-components';
import { Subtitle } from '../../../components/BaseStyles/Headings';
import { device } from '../../../components/BaseStyles/Sizing';
import { Table, TName } from '../../../components/BaseStyles/Table';

export const TypeDamageSection = styled.section`
	margin: 5rem 0;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 3rem;

	@media ${device.sm} {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
`;

export const TypeDamageTable = styled(Table)`
	width: 100%;
	margin-top: 0.5rem;

	& tr {
		border: 1px solid rgba(130, 130, 130, 0.2);
		border-left: none;
		border-right: none;

		& th {
			width: 25%;
			background: rgba(130, 130, 130, 0.2);
			font-size: 1.5rem;
		}

		& td {
			text-align: center;
			border: none;

			& div {
				background: none !important;

				& img {
					display: inline-block;
					transition: 0.3s ease-in-out;
					&:hover {
						transform: scale(1.05);
					}
				}
			}
		}
	}

	&:first-of-type {
		margin-bottom: 5rem;
	}
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
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
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
			@media ${device.sm} {
				width: 72px;
				height: 72px;
			}
		}

		& p {
			font-size: 1.3rem;
		}

		& a {
			font-size: 1.7rem;
			font-weight: 700;
			text-transform: capitalize;
			cursor: pointer;
			transition: 0.3s ease-in-out;

			&:hover {
				color: ${({ theme }) => theme.red};
			}
		}

		&:hover {
			border: 1px solid ${({ theme }) => theme.red};
		}
	}
`;

export const TypeMovesTable = styled(Table)`
	width: 100%;
	margin: 3rem auto 0;

	@media ${device.md} {
		width: auto;
	}
`;

export const TypeMovesName = styled(TName)`
	& a {
		border-bottom: 1px solid transparent;
		cursor: pointer;

		&:hover {
			border-bottom: 1px solid ${({ theme }) => theme.secondary};
		}
	}
`;

export const TypeMovesData = styled.td`
	text-align: center;
	text-transform: capitalize;
`;

export const TypeMovesComment = styled.p`
	text-align: center;
	font-size: 1.5rem;
	margin: 0.75rem 0 0;
`;
