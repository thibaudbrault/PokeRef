import styled from 'styled-components';
import { device } from '../../../../components/BaseStyles/Sizing';

export const PokemonSpritesDiv = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	row-gap: 3rem;
	align-items: center;
	justify-items: center;

	& div {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		& img {
			width: 96px;
			height: 96px;
		}

		& p {
			margin-top: 1rem;
			font-size: 1.5rem;
		}
	}

	@media ${device.xs} {
		grid-template-columns: repeat(2, 1fr);
	}
`;

export const PokemonAnimatedSpritesDiv = styled(PokemonSpritesDiv)`
	& div {
		& img {
			width: 48px;
			height: 48px;
		}
	}
`;
