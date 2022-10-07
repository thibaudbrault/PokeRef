import Image from 'next/image';
import React from 'react';
import { Link } from 'react-router-dom';
import { H3, Span } from '/components/BaseStyles/Headings';
import { Section } from '/components/BaseStyles/Sizing';
import { TypeListSubtitle, TypePokemonList } from '../StyledTypeCard';

function Pokemon({ type, pokedex }) {
	// Returns the number of pokemon with this type
	const nbPokemon = [];
	pokedex.forEach(fp => {
		if (fp.name === type.pokmeon.name) {
			if (fp.id < 899) {
				nbPokemon.push(fp)
			}
		}
		return nbPokemon
	})

	return (
		<Section>
			<H3>Pokémon</H3>
			<TypeListSubtitle>
				{nbPokemon.length} Pokémon are <Span>{type.name}</Span> type
			</TypeListSubtitle>
			<TypePokemonList>
				{type?.pokemon?.map((tp) =>
					pokedex?.map(
						(p) =>
							p.name === tp.pokemon.name &&
							p.id < 899 && (
								<li>
									<Image
										src={p.sprites.front_default}
										alt={p.name}
										loading='lazy'
									/>
									<p>#{p?.id}</p>
									<Link href={{
											pathname: '/pokemon/[name]',
											query: { name: p.name },
										}} key={p.name}>
										{tp?.pokemon?.name?.replace(/-/g, ' ')}
									</Link>
								</li>
							)
					)
				)}
			</TypePokemonList>
		</Section>
	);
}

export default Pokemon;
