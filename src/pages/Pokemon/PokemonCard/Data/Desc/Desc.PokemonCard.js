import React from 'react';
import { Link } from 'react-router-dom';
import { Span } from '../../../../../components/BaseStyles/Headings';
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
				<p>
					Pokémon{' '}
					<Span>
						<i>{game.replace(/-/g, ' ')}</i>
					</Span>
				</p>
			</PokemonDataDesc>
			<PokemonDataTypes>
				{pokemon?.types?.map((pt) => (
					<Type id={pt.type.name}>
						<Link to={`types/${pt.type.name}`}>
							<img alt={pt.type.name} />
							<span>{pt.type.name}</span>
						</Link>
					</Type>
				))}
			</PokemonDataTypes>
		</ul>
	);
}

export default Desc;
