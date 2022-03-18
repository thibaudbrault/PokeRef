import React from 'react';
import Method from '../../Method/Method';

import Level from './Level/Level';
import Machine from './Machine/Machine';
import Egg from './Egg/Egg';
import Evolving from './Evolving/Evolving';
import Tutor from './Tutor/Tutor';

function Moves({toggleState, toggleTable, pokemon, move, machine, version, game}) {
    return (
        <section className='pokemon_moves'>
            <h3 className='pokemon_moves_title'>Moves</h3>
            <Method 
                toggleState={toggleState}
                toggleTable={toggleTable}
            />
            <Level 
                pokemon={pokemon}
                move={move}
                version={version}
                toggleState={toggleState}
            />
            <Machine 
                pokemon={pokemon}
                move={move}
                machine={machine}
                version={version}
                toggleState={toggleState}
            />
            <Egg 
                pokemon={pokemon}
                move={move}
                version={version}
                toggleState={toggleState}
            />
            <Tutor 
                pokemon={pokemon}
                move={move}
                version={version}
                toggleState={toggleState}
            />
            <Evolving 
                pokemon={pokemon}
                move={move}
                version={version}
                toggleState={toggleState}
            />

            <p className='pokemon_moves_void'><span>{pokemon?.name?.replace(/-/g, ' ')}</span> ‌‌ doesn't learn any moves this way in Pokémon ‌‌ <span>{game}</span></p>
            
        </section>
    )
}

export default Moves