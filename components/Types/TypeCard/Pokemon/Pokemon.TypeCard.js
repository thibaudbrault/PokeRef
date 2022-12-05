import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { H3, Span } from '/components/BaseStyles/Headings';
import { Section } from '/components/BaseStyles/Sizing';
import { TypeListSubtitle, TypePokemonList } from '../StyledTypeCard';
import Link from 'next/link';

function Pokemon({ type, pokedex }) {
	// Returns the number of pokemon with this type
	let nbPokemon = document.querySelectorAll('.pokemonElement').length;

	return (
		<Section>
			<H3>Pokémon</H3>
			<TypeListSubtitle>
				{nbPokemon} Pokémon are <Span>{type.name}</Span> type
			</TypeListSubtitle>
			<TypePokemonList>
				{type?.pokemon?.map((tp) =>
					pokedex?.map(
						(p) =>
							p.name === tp.pokemon.name &&
							p.id < 905 && (
								<li className='pokemonElement'>
									<Image
										src={p.sprites.front_default}
										alt={p.name}
										width={96}
										height={96}
										loading='lazy'
									/>
									<p>#{p?.id}</p>
									<Link
										href={{
											pathname: '/pokemon/[name]',
											query: { name: p.name },
										}}
										key={p.name}
									>
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
