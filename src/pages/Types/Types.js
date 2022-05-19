import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MainSmall } from '../../components/BaseStyles/Sizing';
import { ModifiedType, TypesList } from './StyledTypes';
import { useTypes } from '../../helpers/DataFetch';
import { LoadingImg } from '../../components/BaseStyles/Loader';

function Types() {
	const { types, loading } = useTypes(
		'https://pokeapi.co/api/v2/type?limit=18'
	);

	useEffect(() => {
		document.title = `Types | PokéInfo`;
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
				<TypesList>
					{types
						.sort((a, b) => a.name.localeCompare(b.name))
						.map((t) => (
							<li key={t.name}>
								<ModifiedType id={t.name}>
									<Link to={`/types/${t.name}`} key={t.name}>
										<img alt={t.name} />
										<h2>{t.name}</h2>
									</Link>
								</ModifiedType>
							</li>
						))}
				</TypesList>
			)}
		</MainSmall>
	);
}

export default Types;
