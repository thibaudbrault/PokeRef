import React from 'react';
import Desc from './Desc/Desc.MoveCard';
import Effect from './Effect/Effect.MoveCard';
import { MoveCardDataSection } from './StyledData.MoveCard';

function Data({ move, machine, version }) {
	return (
		<MoveCardDataSection>
			<Desc move={move} machine={machine} version={version} />
			<Effect move={move} version={version} />
		</MoveCardDataSection>
	);
}

export default Data;
