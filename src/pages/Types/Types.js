import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import { MainSmall } from '../../components/BaseStyles/Sizing';
import { TypesList } from './StyledTypes';
import { useTypes } from '../../helpers/DataFetch';

function Types() {
	
	const { types, loading } = useTypes('https://pokeapi.co/api/v2/type?limit=18');

	useEffect(() => {
		document.title = `Types | PokéInfo`;
	}, []);

	return (
		<MainSmall>
			{loading ? (
				<BarWave width='40px' height='20px' color='#cc0000' />
			) : (
				<TypesList>
					{types
						.sort((a, b) => a.name.localeCompare(b.name))
						.map((t) => (
							<li id={t.name} key={t.name}>
								<Link to={`/types/${t.name}`} key={t.name}>
									<img alt={t.name} />
									<h2>{t.name}</h2>
								</Link>
							</li>
						))}
				</TypesList>
			)}
		</MainSmall>
	);
}

export default Types;
