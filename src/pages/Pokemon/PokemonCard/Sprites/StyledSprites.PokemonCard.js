import styled from 'styled-components';

export const PokemonSpritesSection = styled.section`
	padding-bottom: 5rem;
`;

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
			font-size: 1.5rem;
		}
	}
`;
