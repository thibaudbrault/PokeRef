import React from 'react';
import Method from '../../../../helpers/Method/Method';

import Level from './Level/Level.PokemonCard';
import Machine from './Machine/Machine.PokemonCard';
import Egg from './Egg/Egg.PokemonCard';
import Evolving from './Evolving/Evolving.PokemonCard';
import Tutor from './Tutor/Tutor.PokemonCard';
import { PokemonMovesSection } from './StyledMoves.PokemonCard';
import { H3 } from '../../../../components/BaseStyles/Headings';

function Moves({toggleState, toggleTable, pokemon, move, machine, version, game}) {
    return (
        <PokemonMovesSection>
            <H3>Moves</H3>
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
                game={game}
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

            {/* <PokemonMovesEmpty>
                <span>{pokemon?.name?.replace(/-/g, ' ')}</span> ‌‌ doesn't learn any moves this way in Pokémon ‌‌ <span>{game}</span>
            </PokemonMovesEmpty> */}
            
        </PokemonMovesSection>
    )
}

export default Moves