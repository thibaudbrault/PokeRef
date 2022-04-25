import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
	Loading,
	PokedexDropdown,
	PokedexElement,
	PokedexImage,
	PokedexList,
	PokedexTypes,
	SpriteNormal,
	SpriteShiny,
} from './StyledPokemon';
import { Input, Search } from '../../components/BaseStyles/Inputs';
import { MainSmall } from '../../components/BaseStyles/Sizing';
import { Type } from '../../components/BaseStyles/Themes';

import { usePokedex } from '../../helpers/DataFetch';
import Autocomplete from '../../components/Autocomplete/Autocomplete';

function Pokemon() {

	const [filteredPokedex, setFilteredPokedex] = useState([]);
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(true);

	// Default values of dropdown

	const [form, setForm] = useState('default');
	const [type, setType] = useState('all');
	const [generation, setGeneration] = useState('all');

	// Import hooks for all pokemon

	const {pokedex, next} = usePokedex(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);

	console.log(next);

	const moreData = () => {
		if (next === null) {
			setHasMore(false);
		}
		setOffset(offset + 20);
	};

	// Filter pokedex array : search bar and dropdowns filters

	useEffect(() => {
		setFilteredPokedex(
			pokedex
				.filter((pokedex) => {
					return (
						type === 'all' ||
						pokedex.types.map((pt) => pt.type.name).includes(type)
					);
				})
				.filter((pokedex) => {
					if (generation === 'all' && form === 'default') {
						setOffset(0);
						return pokedex?.id < 899;
					} else if (generation === 'all' && form === 'regional - alola') {
						setOffset(987);
						return pokedex?.name?.includes('alola');
					} else if (generation === 'all' && form === 'regional - galar') {
						setOffset(1058)
						return (
							pokedex?.name?.includes('galar'))
					} else if (generation === 'all' && form === 'mega') {
						setOffset(930);
						return pokedex?.name?.includes('mega');
					} else if (generation === 'all' && form === 'gmax') {
						setOffset(1092);
						return pokedex?.name?.includes('gmax');
					} else if (generation === 'gen1' && form === 'default') {
						setOffset(0);
						return pokedex?.id < 152;
					} else if (generation === 'gen2' && form === 'default') {
						setOffset(151);
						return pokedex?.id > 151 && pokedex?.id < 252;
					} else if (generation === 'gen3' && form === 'default') {
						setOffset(251);
						return pokedex?.id > 251 && pokedex?.id < 387;
					} else if (generation === 'gen4' && form === 'default') {
						setOffset(386);
						return pokedex?.id > 386 && pokedex?.id < 494;
					} else if (generation === 'gen5' && form === 'default') {
						setOffset(493);
						return pokedex?.id > 493 && pokedex?.id < 650;
					} else if (generation === 'gen6' && form === 'default') {
						setOffset(649);
						return pokedex?.id > 649 && pokedex?.id < 722;
					} else if (generation === 'gen7' && form === 'default') {
						setOffset(721);
						return pokedex?.id > 721 && pokedex?.id < 810;
					} else if (generation === 'gen8' && form === 'default') {
						setOffset(809);
						return pokedex?.id > 809 && pokedex?.id < 898;
					}
				})
		);
	}, [pokedex, form, type, generation]);

	useEffect(() => {
		document.title = `Pokémon | PokéInfo`;
	}, []);

	return (
		<MainSmall>
			<Search>
				{/* <Input>
					<label htmlFor='searchBar'>Search</label>
					<input
						type='text'
						placeholder='Pokémon Name'
						name='searchBar'
						id='searchBar'
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
				</Input> */}

				<div>
					<Autocomplete 
						results={pokedex?.name}
					/>
				</div>

				<PokedexDropdown>
					<label htmlFor='form'>Form</label>
					<select
						name='form'
						id='form'
						value={form}
						onChange={(e) => {
							setForm(e.target.value);
						}}
					>
						<option value='default'>Default</option>
						<option value='regional - alola'>Regional - Alola</option>
						<option value='regional - galar'>Regional - Galar</option>
						<option value='mega'>Mega</option>
						<option value='gmax'>Gmax</option>
					</select>
				</PokedexDropdown>

				<PokedexDropdown className={form === 'default' ? '' : 'hidden'}>
					<label htmlFor='generation'>Generation</label>
					<select
						name='generation'
						id='generation'
						value={generation}
						onChange={(e) => {
							setGeneration(e.target.value);
						}}
					>
						<option value='all'>All</option>
						<option value='gen1'>Generation I</option>
						<option value='gen2'>Generation II</option>
						<option value='gen3'>Generation III</option>
						<option value='gen4'>Generation IV</option>
						<option value='gen5'>Generation V</option>
						<option value='gen6'>Generation VI</option>
						<option value='gen7'>Generation VII</option>
						<option value='gen8'>Generation VIII</option>
					</select>
				</PokedexDropdown>

				<PokedexDropdown>
					<label htmlFor='type'>Type</label>
					<select
						name='type'
						id='type'
						value={type}
						onChange={(e) => {
							setType(e.target.value);
						}}
					>
						<option value='all'>All</option>
						<option value='bug'>Bug</option>
						<option value='dark'>Dark</option>
						<option value='dragon'>Dragon</option>
						<option value='electric'>Electric</option>
						<option value='fairy'>Fairy</option>
						<option value='fighting'>Fighting</option>
						<option value='fire'>Fire</option>
						<option value='flying'>Flying</option>
						<option value='ghost'>Ghost</option>
						<option value='grass'>Grass</option>
						<option value='ground'>Ground</option>
						<option value='ice'>Ice</option>
						<option value='normal'>Normal</option>
						<option value='poison'>Poison</option>
						<option value='psychic'>Psychic</option>
						<option value='rock'>Rock</option>
						<option value='steel'>Steel</option>
						<option value='water'>Water</option>
					</select>
				</PokedexDropdown>
			</Search>
			<hr />
			<PokedexList>
				<InfiniteScroll
					dataLength={pokedex.length}
					next={moreData}
					hasMore={hasMore}
					loader={<Loading>More Pokémon coming</Loading>}
					endMessage={<Loading>No more pokémon</Loading>}
				>
					{filteredPokedex?.map((p) => (
						<PokedexElement>
							<PokedexImage>
								{p.id < 152 && (
									<SpriteNormal
										src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${p.id}.png`}
										alt={p.name}
										loading='lazy'
									/>
								)}
								{p.id > 151 && p.id < 252 && (
									<>
										<SpriteNormal
											src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${p.id}.png`}
											alt={p.name}
											loading='lazy'
										/>
										<SpriteShiny
											src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/shiny/${p.id}.png`}
											alt={p.name}
											loading='lazy'
										/>
									</>
								)}
								{p.id > 251 && p.id < 387 && (
									<>
										<SpriteNormal
											src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${p.id}.png`}
											alt={p.name}
											loading='lazy'
										/>
										<SpriteShiny
											src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/shiny/${p.id}.png`}
											alt={p.name}
											loading='lazy'
										/>
									</>
								)}
								{p.id > 386 && p.id < 494 && (
									<>
										<SpriteNormal
											src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/${p.id}.png`}
											alt={p.name}
											loading='lazy'
										/>
										<SpriteShiny
											src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/shiny/${p.id}.png`}
											alt={p.name}
											loading='lazy'
										/>
									</>
								)}
								{p.id > 493 && p.id < 650 && (
									<>
										<SpriteNormal
											src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${p.id}.png`}
											alt={p.name}
											loading='lazy'
										/>
										<SpriteShiny
											src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/shiny/${p.id}.png`}
											alt={p.name}
											loading='lazy'
										/>
									</>
								)}
								{p.id > 649 && (
									<>
										<SpriteNormal
											src={p.sprites.front_default}
											alt={p.name}
											loading='lazy'
										/>
										<SpriteShiny
											src={p.sprites.front_shiny}
											alt=' '
											loading='lazy'
										/>
									</>
								)}
							</PokedexImage>
							{p?.id < 899 && <p>#{p?.id?.toString()?.padStart(3, '0')}</p>}
							<Link to={`/pokemon/${p.name}`} key={p.name}>
								<h2>{p?.name?.replace(/-/g, ' ')}</h2>
							</Link>
							<PokedexTypes>
								{p?.types?.map((pt) => (
									<Type id={pt.type.name}>
										<img alt={pt.type.name} />
										<Link to={`/types/${pt.type.name}`}>{pt?.type?.name}</Link>
									</Type>
								))}
							</PokedexTypes>
						</PokedexElement>
					))}
				</InfiniteScroll>
			</PokedexList>
		</MainSmall>
	);
}

export default Pokemon;
