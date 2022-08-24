import styled from 'styled-components';
import { Search } from '../../components/BaseStyles/Inputs';
import { device } from '../../components/BaseStyles/Sizing';

export const PokedexSearch = styled(Search)`
	@media ${device.sm} {
		padding: 0 5rem;
	}
`;

export const PokedexDropdown = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin: 0 0.5rem;

	& label {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
		justify-self: flex-start;
	}

	& select {
		min-width: 15rem;
		padding: 0.5rem;
		color: ${({ theme }) => theme.secondary};
		background: transparent;
		border: 1px solid ${({ theme }) => theme.secondary};
		border-radius: 5px;
		transition: 0.3s ease-in-out;

		&:focus {
			border: 1px solid ${({ theme }) => theme.red};
		}

		& option {
			color: ${({ theme }) => theme.secondary};
			background: ${({ theme }) => theme.main};
		}
	}

	.hidden {
		display: none !important;
	}

	&:last-of-type {
		margin-left: 0.5rem;
		margin-right: 0;
	}

	@media ${device.lg} {
		margin-top: 1rem;
	}
`;

export const PokedexList = styled.div`
	max-width: 1300px;
	margin: 0 auto;
	& div {
		& div {
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			flex-wrap: wrap;
			overflow: visible !important;
		}
	}
`;

export const PokedexElement = styled.div`
	width: 20rem;
	height: 30rem;
	margin: 3rem;
	padding: 2rem 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background: rgba(255, 255, 255, 0.4);
	border: 1px solid transparent;
	border-radius: 25px;
	text-align: center;
	transition: 0.3s ease-in-out;

	& h2 {
		font-size: 1.5rem;
		font-family: 'Press Start 2P';
		text-transform: capitalize;
		cursor: pointer;
		transition: 0.3s ease-in-out;
		&:hover {
			color: ${({ theme }) => theme.red};
		}

		@media ${device.sm} {
			font-size: 1.3rem;
		}
	}

	& p {
		font-size: 1.3rem;
	}

	&:hover {
		transform: scale(1.05);
	}

	&:nth-child(even) {
		&:hover {
			border-radius: 10px 50px;

			@media ${device.sm} {
				border-radius: 7px 35px;
			}
		}
	}

	&:nth-child(odd) {
		&:hover {
			border-radius: 50px 10px;

			@media ${device.sm} {
				border-radius: 7px 35px;
			}
		}
	}

	@media ${device.sm} {
		width: 18rem;
		height: 27rem;
		margin: 2rem;
		padding: 1.5rem 2.5rem;
	}
`;

export const SpriteNormal = styled.img`
	position: relative;
	top: 0;
	left: 0;
	transition: 0.3s ease-in-out;

	@media ${device.sm} {
		width: 72px;
		height: 72px;
	}
`;

export const SpriteShiny = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
	transition: 0.3s ease-in-out;

	@media ${device.sm} {
		width: 72px;
		height: 72px;
	}
`;

export const PokedexImage = styled.div`
	position: relative;
	margin: 0 auto;

	&:hover ${SpriteShiny} {
		opacity: 1;
	}
`;

export const PokedexTypes = styled.div`
	position: relative;
	width: 100%;
	height: 40%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	font-size: 1.3rem;

	& div {
		width: 100%;
		margin: 0.5rem 0;
		padding: 0.5rem;
		border-radius: 5px;
		text-transform: uppercase;
		text-align: center;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
		color: #c4c4c4;
		border: 1px solid rgba($color: #161616, $alpha: 0.2);

		& img {
			height: 1.5rem;
			max-height: 1.5rem;
		}

		& a {
			padding-left: 0.5rem;
			font-family: 'Press Start 2P';
		}
	}

	@media ${device.sm} {
		font-size: 1rem;
	}
`;

export const Loading = styled.p`
	width: 100%;
	margin: 3rem 0;
	text-align: center;
	font-size: 1.7rem;
	font-weight: 700;
`;
