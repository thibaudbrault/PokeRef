import React from 'react'
import Breeding from './Breeding/Breeding'
import Forms from './Forms/Forms'
import Training from './Training/Training'

function Info({pokemon, species, evolution}) {
    return (
        <section className='pokemon_info'>
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
        </section>
    )
}

export default Info