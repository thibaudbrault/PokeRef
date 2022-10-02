import React from 'react';
import {
	PokemonDataImg,
	PokemonDataLeg,
	PokemonDataMyt,
} from '../StyledData.PokemonCard';

function Sprite({ pokemon, species }) {
	return (
		<>
			<PokemonDataImg
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
				alt={pokemon?.name}
				loading='lazy'
				width='75%'
				height='75%'
				layout='responsive'
			/>
			<>
				{species?.is_legendary === true && (
					<PokemonDataLeg>Legendary</PokemonDataLeg>
				)}
				{species?.is_mythical === true && (
					<PokemonDataMyt>Mythical</PokemonDataMyt>
				)}
			</>
		</>
	);
}

export default Sprite;
