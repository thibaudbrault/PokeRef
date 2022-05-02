import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
	Loading,
	PokedexElement,
	PokedexList,
	PokedexTypes,
} from './StyledPokemon';
import { MainSmall } from '../../components/BaseStyles/Sizing';
import { Type } from '../../components/BaseStyles/Themes';

import { usePokedex } from '../../helpers/DataFetch';
import Filters from './Components/Filters.Pokemon';
import Sprites from './Components/Sprites.Pokemon';

const Pokemon = React.memo(function Pokemon() {

	const [filteredPokedex, setFilteredPokedex] = useState([]);
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(true);

	const { pokedex, next } = usePokedex(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);

	console.log(next);

	const moreData = () => {
		if (next === null) {
			setHasMore(false);
		}
		setOffset(offset + 20);
	};

	useEffect(() => {
		document.title = `Pokémon | PokéInfo`;
	}, []);

	return (
		<MainSmall>
			
			<Filters 
				pokedex={pokedex}
				setFilteredPokedex={setFilteredPokedex}
				setOffset={setOffset}
			/>

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
							
							<Sprites 
								p={p}
							/>

							{p?.id < 899 && 
								<p>#{p?.id?.toString()?.padStart(3, '0')}</p>
							}
							<Link 
								to={`/pokemon/${p.name}`} 
								key={p.name}
							>
								<h2>{p?.name?.replace(/-/g, ' ')}</h2>
							</Link>
							<PokedexTypes>
								{p?.types?.map((pt) => (
									<Type id={pt.type.name}>
										<img alt={pt.type.name} />
										<Link 
											to={`/types/${pt.type.name}`}
										>
											{pt?.type?.name}
										</Link>
									</Type>
								))}
							</PokedexTypes>
						</PokedexElement>
					))}
				</InfiniteScroll>
			</PokedexList>
		</MainSmall>
	);
});

export default Pokemon;
