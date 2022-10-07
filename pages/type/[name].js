import React from 'react';

import { BackButton } from '/components/BaseStyles/Inputs';
import { MainBig } from '/components/BaseStyles/Sizing';
import { CardTitle } from '/components/BaseStyles/Headings';
import Damage from '/components/Types/TypeCard/Damage/Damage.TypeCard';
import Moves from '/components/Types/TypeCard/Moves/Moves.TypeCard';
import Pokemon from '/components/Types/TypeCard/Pokemon/Pokemon.TypeCard';
import { useMoves, usePokedex, useType } from '/helpers/DataFetch';
import Loader from '/components/Loader/Loader';
import { FaChevronLeft } from 'react-icons/fa';
import Head from 'next/head';

const TypeCard = () => {
	const router = useRouter();
	const { name } = router.query;

	const {
		isLoading,
		error,
		data: type,
	} = useType(`https://pokeapi.co/api/v2/type/${name}`);

	const { data: pokedex } = usePokedex(
		'https://pokeapi.co/api/v2/pokemon?limit=905'
	);

	const { data: moves } = useMoves();

	if (error) {
		return <p>{error}</p>;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Head>
				<title>
					{name.charAt(0).toUpperCase() + name.slice(1)} | Type | PokéRef
				</title>
				<meta name='description' content={`Find every details about the ${name} type`} />
				<meta property='og:title' content={`${name} | Type | PokéRef`} />
				<meta
					property='og:description'
					content={`Find every details about the ${name} type`}
				/>
				<meta
					property='og:url'
					content={`https://pokeref.app/type/${name}`}
				/>
				<meta property='og:type' content='website' />
			</Head>
			<MainBig>
				<CardTitle>{type?.name}</CardTitle>

				<Damage type={type} />

				<Pokemon type={type} pokedex={pokedex} />

				<Moves type={type} moves={moves} />

				<BackButton onClick={() => navigate('/types')}>
					{' '}
					<FaChevronLeft /> Back to Types
				</BackButton>
			</MainBig>
		</>
	);
};

export default TypeCard;
