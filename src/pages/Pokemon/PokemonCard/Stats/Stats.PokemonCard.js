import React from 'react';
import Bars from './Bars/Bars.PokemonCard';
import Types from './Types/Types.PokemonCard';

import { PokemonStatsSection } from './StyledStats.PokemonCard';

function Stats({pokemon}) {
    return (
        <PokemonStatsSection>
            <Bars 
                pokemon={pokemon}
            />
            <Types />
        </PokemonStatsSection>
    )
}

export default Stats