import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MainSmall } from '../../components/BaseStyles/Sizing';
import { ModifiedType, TypesList } from './StyledTypes';
import { useTypes } from '../../helpers/DataFetch';
import Loader from '../../components/Loader/Loader';

function Types() {
	const { isLoading, error, data: types } = useTypes();

	// const sortedTypes = useMemo(() => {
	// 	return [...types]?.sort((a, b) => a.name.localeCompare(b.name));
	// }, [types]);

	useEffect(() => {
		document.title = `Types | PokéRef`;
	}, []);

	if (error) {
		return <p>{error}</p>;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<MainSmall>
			<TypesList>
				{types?.map((t) => (
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
		</MainSmall>
	);
}

export default Types;
