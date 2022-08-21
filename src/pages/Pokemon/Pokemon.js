import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
	Loading,
	PokedexElement,
	PokedexList,
	PokedexTypes,
} from './StyledPokemon';
import { MainBig } from '../../components/BaseStyles/Sizing';
import { Type } from '../../components/BaseStyles/Themes';

import { usePokedex } from '../../helpers/DataFetch';
import Filters from './Components/Filters.Pokemon';
import Sprites from './Components/Sprites.Pokemon';
import { LoadingImg } from '../../components/BaseStyles/Loader';

function Pokemon() {
	const [filteredPokedex, setFilteredPokedex] = useState([]);
	const [offset, setOffset] = useState(0);
	const [limit, setLimit] = useState(25);
	const [hasMore, setHasMore] = useState(true);

	const { pokedex } = usePokedex(
		`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
	);

	const fetchMore = () => {
		if (pokedex.length >= 898) {
			setHasMore(false);
		}
		setLimit((l) => l + 25);
	};

	useEffect(() => {
		document.title = `Pokémon | PokéRef`;
	}, []);

	return (
		<MainBig>
			<Filters
				pokedex={pokedex}
				setFilteredPokedex={setFilteredPokedex}
				setOffset={setOffset}
			/>
			<PokedexList>
				<InfiniteScroll
					dataLength={pokedex.length}
					next={fetchMore}
					hasMore={hasMore}
					loader={
						<LoadingImg>
							<img
								src='https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'
								alt=''
								width={48}
								height={48}
							/>
						</LoadingImg>
					}
					endMessage={<Loading>No more pokémon</Loading>}
				>
					{filteredPokedex?.map((p) => (
						<PokedexElement>
							<Sprites p={p} />

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
		</MainBig>
	);
}

export default Pokemon;
