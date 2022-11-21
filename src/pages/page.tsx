import React, { useState } from 'react';
import Head from 'next/head';
import {
	PokedexElement,
	PokedexList,
	PokedexTypes,
	PokedexVerticalText,
	ToBottom,
} from '../components/Pokemon/StyledPokemon.js';
import { MainBig } from '../components/Common/Sizing';
import { Type } from '../components/Common/Themes';
import { usePokedex } from '../helpers/DataFetch';
import Loader from '../components/Loader/Loader';
import FaAngleDown from '@meronex/icons/fa/FaAngleDown';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic.js';
import { Pokemon } from '@/types/types.jsx';

const Filters = dynamic(() =>
	import('../components/Pokemon/Components/Filters.Pokemon')
);
const Sprites = dynamic(() =>
	import('../components/Pokemon/Components/Sprites.Pokemon')
);

function Pokemon(): JSX.Element {
	// Filters the pokemon returned with the filters
	const [filteredPokedex, setFilteredPokedex] = useState<any[]>([]);
	// Modify the first pokemon displayed
	const [offset, setOffset] = useState<number>(0);
	//Modify the max number of pokemon displayed
	const [limit, setLimit] = useState<number>(905);
	// Form of the pokemon (changed with a dropdown)
	const [form, setForm] = useState<string>('default');
	// Type of the pokemon (changed with a dropdown)
	const [type, setType] = useState<string>('all');
	// Generation of the pokemon (changed with a dropdown)
	const [generation, setGeneration] = useState<string>('all');

	const {
		isLoading,
		error,
		data: pokedex,
	} = usePokedex(
		`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
	);

	if (error instanceof Error) {
		return { error };
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Head>
				<title>Pokeref | A pokemon encyclopedia</title>
				<meta
					name='description'
					content='Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game'
				/>
				<meta property='og:title' content='Pokeref | A pokemon encyclopedia' />
				<meta
					property='og:description'
					content='Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game'
				/>
				<meta property='og:url' content='https://pokeref.app/' />
				<meta property='og:type' content='website' />
			</Head>
			<MainBig>
				<Filters
					pokedex={pokedex}
					setFilteredPokedex={setFilteredPokedex}
					setOffset={setOffset}
					setLimit={setLimit}
					form={form}
					setForm={setForm}
					type={type}
					setType={setType}
					generation={generation}
					setGeneration={setGeneration}
				/>
				<PokedexVerticalText>ポケモン</PokedexVerticalText>
				<PokedexList>
					<div>
						{filteredPokedex?.map((p: Pokemon) => (
							<PokedexElement key={p.id}>
								<Sprites p={p} />
								{p?.id < 905 && <p>#{p?.id?.toString()?.padStart(3, '0')}</p>}
								<h2>
									<Link
										href={{
											pathname: '/pokemon/[name]',
											query: { name: p.name },
										}}
										key={p.name}
									>
										{p?.name
											?.replace(/-/g, ' ')
											.replace('single strike', '')
											.replace('rapid strike', '')
											.replace('red meteor', '')}
									</Link>
								</h2>
								<PokedexTypes>
									{p?.types?.map((pt) => (
										<Type id={pt.type.name} key={pt.type.name}>
											<Link
												href={{
													pathname: '/type/[name]',
													query: { name: pt.type.name },
												}}
												passHref
											>
												<a>
													<Image alt={pt.type.name} />
													<span>{pt?.type?.name}</span>
												</a>
											</Link>
										</Type>
									))}
								</PokedexTypes>
							</PokedexElement>
						))}
					</div>
				</PokedexList>
				<ToBottom href='#footer' aria-label='To Bottom'>
					<FaAngleDown />
				</ToBottom>
			</MainBig>
		</>
	);
}

export default Pokemon;