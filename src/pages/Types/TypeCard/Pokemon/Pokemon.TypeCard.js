import React from 'react';
import { Link } from 'react-router-dom';
import { Span } from '../../../../components/BaseStyles/Headings';
import {
	TypeListSection,
	TypeListSubtitle,
	TypePokemonList,
} from '../StyledTypeCard';

function Pokemon({ type, pokedex }) {
	
	// Returns the number of pokemon with this type
	const nbPokemon = type?.pokemon?.length;

	return (
		<TypeListSection>
			<TypeListSubtitle>
				{nbPokemon} Pokémon are <Span>{type.name}</Span> type
			</TypeListSubtitle>
			<TypePokemonList>
				{type?.pokemon?.map((tp) =>
					pokedex?.map(
						(p) =>
							p.name === tp.pokemon.name &&
							p.id < 899 && (
								<li>
									<img
										src={p.sprites.front_default}
										alt={p.name}
										loading='lazy'
									/>
									<p>#{p?.id}</p>
									<Link to={`/pokemon/${p.name}`} key={p.name}>
										{tp?.pokemon?.name?.replace(/-/g, ' ')}
									</Link>
								</li>
							)
					)
				)}
			</TypePokemonList>
		</TypeListSection>
	);
}

export default Pokemon;
