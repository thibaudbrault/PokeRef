import React from 'react';
import { Link } from 'react-router-dom';
import { Type } from '../../../../../components/BaseStyles/Themes';
import { PokemonDataDesc, PokemonDataTypes } from '../StyledData.PokemonCard';

function Desc({ pokemon, species, game }) {
	return (
		<ul>
			<PokemonDataDesc>
				{species?.flavor_text_entries?.map(
					(sf) =>
						sf?.language?.name === 'en' &&
						sf?.version?.name === game && (
							<>{sf?.flavor_text?.replace('\u000c', ' ')}</>
						)
				)}
			</PokemonDataDesc>
			<PokemonDataTypes>
				{pokemon?.types?.map((pt) => (
					<Type id={pt.type.name}>
						<img alt={pt.type.name} />
						<Link to={`types/${pt.type.name}`}>{pt.type.name}</Link>
					</Type>
				))}
			</PokemonDataTypes>
		</ul>
	);
}

export default Desc;
