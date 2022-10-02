import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { BackButton } from '../../../components/BaseStyles/Inputs';
import { MainBig } from '../../../components/BaseStyles/Sizing';
import { CardTitle } from '../../../components/BaseStyles/Headings';
import Damage from './Damage/Damage.TypeCard';
import Moves from './Moves/Moves.TypeCard';
import Pokemon from './Pokemon/Pokemon.TypeCard';
import { useMoves, usePokedex, useType } from '../../../helpers/DataFetch';
import Loader from '../../../components/Loader/Loader';
import { FaChevronLeft } from 'react-icons/fa';

const TypeCard = () => {
	const { name } = useParams();
	const navigate = useNavigate();

	const {
		isLoading,
		error,
		data: type,
	} = useType(`https://pokeapi.co/api/v2/type/${name}`);

	const { data: pokedex } = usePokedex(
		'https://pokeapi.co/api/v2/pokemon?limit=905'
	);

	const { data: moves } = useMoves();

	const title = `${name}`;

	useEffect(() => {
		document.title = `${
			title.charAt(0).toUpperCase() + title.slice(1)
		} | Types | PokéRef`;
	}, [title]);

	if (error) {
		return <p>{error}</p>;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
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
	);
};

export default TypeCard;
