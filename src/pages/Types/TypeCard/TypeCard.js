import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { BackButton } from '../../../components/BaseStyles/Inputs';
import { MainBig } from '../../../components/BaseStyles/Sizing';
import { CardTitle } from '../../../components/BaseStyles/Headings';
import Damage from './Damage/Damage.TypeCard';
import Moves from './Moves/Moves.TypeCard';
import Pokemon from './Pokemon/Pokemon.TypeCard';
import { useMoves, usePokedex, useType } from '../../../helpers/DataFetch';
import { LoadingImg } from '../../../components/BaseStyles/Loader';

const TypeCard = () => {
	const { name } = useParams();
	const navigate = useNavigate();

	const { type, loading } = useType(`https://pokeapi.co/api/v2/type/${name}`);

	const { pokedex } = usePokedex('https://pokeapi.co/api/v2/pokemon?limit=898');

	const { moves } = useMoves('https://pokeapi.co/api/v2/move?limit=826');

	const title = `${name}`;

	useEffect(() => {
		document.title = `${
			title.charAt(0).toUpperCase() + title.slice(1)
		} | Types | PokéRef`;
	}, [title]);

	return (
		<MainBig>
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
				<>
					<CardTitle>{type?.name}</CardTitle>

					<Damage type={type} />

					<Pokemon type={type} pokedex={pokedex} />

					<Moves type={type} moves={moves} />

					<BackButton onClick={() => navigate('/types')}>
						{' '}
						ᐸ Back to types
					</BackButton>
				</>
			)}
		</MainBig>
	);
};

export default TypeCard;
