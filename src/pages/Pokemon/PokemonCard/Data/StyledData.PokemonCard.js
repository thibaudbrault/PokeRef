import styled from 'styled-components';
import { Pulse } from '../../../../components/BaseStyles/Keyframes';
import { device } from '../../../../components/BaseStyles/Sizing';
import { Table } from '../../../../components/BaseStyles/Table';

export const PokemonDataSection = styled.section`
	padding-bottom: 5rem;
	display: grid;
	align-items: center;
	grid-template-columns: 55% 35%;
	column-gap: 10%;

	@media ${device.sm} {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column-reverse;
	}
`;

export const PokemonDataSprite = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const PokemonDataDesc = styled.li`
	font-size: 2rem;

	& p {
		padding-top: 0.5rem;
		font-size: 1.3rem;
	}
`;

export const PokemonDataTypes = styled.li`
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;

	& div {
		margin: 2rem;
		padding: 0.5rem;
		border-radius: 5px;
		text-transform: uppercase;
		text-align: center;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
		color: #c4c4c4;
		border: 1px solid rgba($color: #161616, $alpha: 0.2);
		cursor: pointer;

		& a {
			font-family: 'Press Start 2P';
			font-size: 1.7rem;

			& img {
				height: 2.5rem;
				display: inline-block;
				cursor: pointer;
			}

			& span {
				padding-left: 0.5rem;
				cursor: pointer;
			}
		}
	}

	@media ${device.sm} {
		justify-content: center;
	}
`;

export const PokemonDataTable = styled(Table)`
	width: 90%;

	& th {
		background: rgba(130, 130, 130, 0.2);
	}

	& td {
		font-size: 1.7rem;
		font-weight: 700;
		text-align: center;
		text-transform: capitalize;
	}
`;

const PokemonDataPill = styled.span`
	margin: 1rem 0 0;
	padding: 1rem 1.5rem;
	border-radius: 50px;
	font-size: 1.7rem;
	transition: 0.3s ease-in-out;
`;

export const PokemonDataLeg = styled(PokemonDataPill)`
	border: 1px solid ${({ theme }) => theme.purple};
	background: ${({ theme }) => theme.purple};
	color: #c4c4c4;

	&:hover {
		background: none;
		color: #161616;
	}
`;

export const PokemonDataMyt = styled(PokemonDataPill)`
	border: 1px solid ${({ theme }) => theme.purple};
	background: transparent;
	color: #161616;

	&:hover {
		background: ${({ theme }) => theme.purple};
		color: #c4c4c4;
	}
`;

export const PokemonDataImg = styled.img`
	animation: ${Pulse} 5s infinite;

	@media ${device.sm} {
		width: 75%;
		margin-bottom: 1rem;
	}
`;
