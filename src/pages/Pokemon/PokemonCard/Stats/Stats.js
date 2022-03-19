import React from 'react'
import Bars from './Bars/Bars'
import Types from './Types/Types'

function Stats({pokemon}) {
    return (
        <section className='pokemon_stats'>
            <Bars 
                pokemon={pokemon}
            />
            <Types />
        </section>
    )
}

export default Stats