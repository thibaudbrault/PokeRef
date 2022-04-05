import React from 'react';
import Desc from './Desc/Desc';
import Sprite from './Sprite/Sprite';
import Base from './Base/Base';
import { PokemonDataSection, PokemonDataSprite } from './StyledData';

function Data({pokemon, species, location, game}) {

    return (
        <PokemonDataSection>
            <div>
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
            <PokemonDataSprite>
                <Sprite 
                    species={species}
                    pokemon={pokemon}
                />
            </PokemonDataSprite>
        </PokemonDataSection>
    )
}

export default Data