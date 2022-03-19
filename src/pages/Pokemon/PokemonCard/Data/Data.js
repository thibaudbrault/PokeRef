import React from 'react';
import Desc from './Desc/Desc';
import Sprite from './Sprite/Sprite';
import Base from './Base/Base';

function Data({pokemon, species, location, game}) {

    return (
        <section className='pokemon_data'>
            <div className='pokemon_data_container'>
                <Desc 
                    species={species}
                    pokemon={pokemon}
                    game={game}
                />
                <Base 
                    species={species}
                    pokemon={pokemon}
                    location={location}
                    game={game}
                />
            </div>
            <div className='pokemon_data_more'>
                <Sprite 
                    species={species}
                    pokemon={pokemon}
                />
            </div>
        </section>
    )
}

export default Data