import React from 'react';
import { Link } from 'react-router-dom';
import { PokemonDataDesc, PokemonDataTypes } from '../StyledData';

function Desc({pokemon, species, game}) {
    return (
        <ul>
            <PokemonDataDesc>
                {species?.flavor_text_entries?.map((sf) => 
                    sf?.language?.name === 'en' && sf?.version?.name === game && 
                        <>
                            {sf?.flavor_text?.replace('\u000c', ' ')}
                        </>
                )}
            </PokemonDataDesc>
            <PokemonDataTypes>
                {pokemon?.types?.map((pt) => (
                    <div id={pt.type.name}>
                        <img alt={pt.type.name} />
                        <Link
                            to={`types/${pt.type.name}`}
                        >
                            {pt.type.name}
                        </Link>
                    </div>
                ))}
            </PokemonDataTypes>
        </ul>
    )
}

export default Desc