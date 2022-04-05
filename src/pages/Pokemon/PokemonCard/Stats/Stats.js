import React from 'react';
import Bars from './Bars/Bars';
import Types from './Types/Types';

import { PokemonStatsSection } from './StyledStats';

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