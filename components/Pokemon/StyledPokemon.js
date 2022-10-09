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

export const PokedexVerticalText = styled.p`
	font-size: 7rem;
	color: ${({ theme }) => theme.secondary};
	writing-mode: sideways-rl;
	position: fixed;
	top: 50%;
	right: 5%;
	transform: translate(-50%, -50%);

	@media ${device.xl} {
		display: none;
	}
`;

export const PokedexList = styled.div`
	max-width: 1300px;
	margin: 0 auto;

	& div {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		flex-wrap: wrap;
	}
`;

export const PokedexElement = styled.div`
	width: 21rem;
	height: 32rem;
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

		& a {
			cursor: pointer;
			transition: 0.3s ease-in-out;
			&:hover {
				color: ${({ theme }) => theme.red};
			}
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
	width: 96px;
	height: 96px;
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
	width: 96px;
	height: 96px;
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

	&:hover ${SpriteNormal} {
		opacity: 0;
	}

	&:hover ${SpriteShiny} {
		opacity: 1;
	}
`;

export const PokedexTypes = styled.div`
	width: 100%;
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
		border: 1px solid rgba(22, 22, 22, 0.2);

		& img {
			height: 1.5rem;
			max-height: 1.5rem;
		}

		& span {
			padding-left: 0.5rem;
			font-family: 'Press Start 2P';
		}
	}

	@media ${device.sm} {
		font-size: 1rem;
	}
`;

export const ToBottom = styled.a`
	padding: 0.5rem;
	display: flex;
	position: fixed;
	right: 5rem;
	bottom: 5rem;
	font-size: 5rem;
	border-radius: 50%;
	background-color: rgba(140, 140, 140, 0.2);
	transition: 0.3s ease-in-out;
	cursor: pointer;

	&:hover {
		color: ${({ theme }) => theme.main};
		background: ${({ theme }) => theme.secondary};
	}

	@media ${device.sm} {
		right: 3rem;
		bottom: 3rem;
		font-size: 3rem;
	}
`;
