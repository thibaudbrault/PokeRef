import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { MainSmall } from '../../../components/BaseStyles/Sizing';
import { PikachuPage } from './StyledPikachu';
import {
	PokedexElement,
	PokedexImage,
	PokedexTypes,
	SpriteNormal,
	SpriteShiny,
} from '../../Pokemon/StyledPokemon';
import { Type } from '../../../components/BaseStyles/Themes';
import { LoadingImg } from '../../../components/BaseStyles/Loader';

function Pikachu() {
	const [pikachu, setPikachu] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`https://pokeapi.co/api/v2/pokemon?limit=500&offset=898`)
			.then((res) => {
				return res.data.results;
			})
			.then((results) => {
				return Promise.all(results.map((res) => axios.get(res.url)));
			})
			.then((results) => {
				setLoading(false);
				setPikachu(results.map((res) => res.data));
			});
	}, []);

	return (
		<MainSmall>
			{loading ? (
				<LoadingImg>
					<img
						src='https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'
						alt=''
						width={48}
						height={48}
					/>
				</LoadingImg>
			) : (
				<PikachuPage>
					{pikachu?.map(
						(p) =>
							p?.name?.includes('pikachu') &&
							!p?.name?.includes('gmax') &&
							!p?.name?.includes('starter') &&
							!p?.name?.includes('world') && (
								<PokedexElement>
									<PokedexImage>
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
									</PokedexImage>
									<p>#025</p>
									<Link to={`/pokemon/${p.name}`} key={p.name}>
										<h2>{p?.name?.replace(/-/g, ' ')}</h2>
									</Link>
									<PokedexTypes>
										{p?.types?.map((pt) => (
											<Type id={pt.type.name}>
												<img alt={pt.type.name} />
												<Link to={`/types/${pt.type.name}`}>
													{pt?.type?.name}
												</Link>
											</Type>
										))}
									</PokedexTypes>
								</PokedexElement>
							)
					)}
				</PikachuPage>
			)}
		</MainSmall>
	);
}

export default Pikachu;
