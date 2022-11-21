import React from 'react';

import { MainSmall } from '../../components/Common/Sizing';
import { ModifiedType, TypesList } from '../../components/Types/StyledTypes';
import { useTypes } from '../../helpers/DataFetch';
import Loader from '../../components/Loader/Loader';
import Link from 'next/link';
import Image from 'next/image';

function Types() {
	const { isLoading, error, data: types } = useTypes();

	if (error instanceof Error) {
		return { error };
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<MainSmall>
				<TypesList>
					{types?.map((t) => (
						<li key={t.name}>
							<ModifiedType id={t.name}>
								<Link
									href={{ pathname: '/type/[name]', query: { name: t.name } }}
									key={t.name}
									passHref
								>
									<a>
										<Image alt={t.name} />
										<h2>{t.name}</h2>
									</a>
								</Link>
							</ModifiedType>
						</li>
					))}
				</TypesList>
			</MainSmall>
		</>
	);
}

export default Types;
