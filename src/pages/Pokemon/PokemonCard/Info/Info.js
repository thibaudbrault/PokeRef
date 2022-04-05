import React from 'react'
import Breeding from './Breeding/Breeding'
import Forms from './Forms/Forms'
import Training from './Training/Training'

import { PokemonInfoSection } from './StyledInfo'

function Info({pokemon, species, evolution}) {
    return (
        <PokemonInfoSection>
            <Breeding 
                species={species}
                evolution={evolution}
            />
            <Training 
                pokemon={pokemon}
                species={species}
            />
            <Forms 
                species={species}
            />
        </PokemonInfoSection>
    )
}

export default Info