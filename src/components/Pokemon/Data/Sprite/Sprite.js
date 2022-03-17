import React from 'react';
import PokemonCard from '../../PokemonCard';

function Sprite() {
    return (
        <>
            <img className='pokemon_data_more_sprite' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon?.name} loading='lazy' />
            <>
                {species?.is_legendary === true && (
                    <span className='pokemon_data_more_legendary'>Legendary</span>
                )}
                {species?.is_mythical === true && (
                    <span className='pokemon_data_more_mythical'>Mythical</span>
                )}
            </>
        </>
  )
}

export default Sprite