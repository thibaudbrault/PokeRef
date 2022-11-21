import React from 'react';
import Bars from './Bars/Bars.PokemonCard';
import Types from './Types/Types.PokemonCard';

import { PokemonStatsSection } from './StyledStats.PokemonCard';

function Stats({ pokemon, types, toggleType, toggleTypeTable }) {
	return (
		<PokemonStatsSection>
			<Bars pokemon={pokemon} />
			<Types
				toggleType={toggleType}
				toggleTypeTable={toggleTypeTable}
				pokemon={pokemon}
				type={types}
			/>
		</PokemonStatsSection>
	);
}

export default Stats;
