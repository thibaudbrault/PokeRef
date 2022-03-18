import React from 'react';
import List from './List/List';
import Sprite from './Sprite/Sprite';
import Table from './Table/Table';

function Data({pokemon, species, location, game}) {

    return (
        <section className='pokemon_data'>
            <div className='pokemon_data_container'>
                <List 
                    species={species}
                    pokemon={pokemon}
                    game={game}
                />
                <Table 
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