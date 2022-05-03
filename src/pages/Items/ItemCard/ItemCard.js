import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { MainBig } from '../../../components/BaseStyles/Sizing';
import {
	CardTitle,
	Span,
	Subtitle,
} from '../../../components/BaseStyles/Headings';
import { BackButton } from '../../../components/BaseStyles/Inputs';
import {
	ItemCardDataCost,
	ItemCardDataEffect,
	ItemCardDataFling,
	ItemCardDataHeld,
	ItemCardDataSection,
	ItemCardDescSection,
	ItemCardDescTable,
	ItemCardDescTitle,
} from './StyledItemCard';
import { useItem } from '../../../helpers/DataFetch';

function ItemCard() {
	const { name } = useParams();
	const navigate = useNavigate();
	
	const { item, loading } = useItem(`https://pokeapi.co/api/v2/item/${name}`);

	const title = `${name}`;

	useEffect(() => {
		document.title = `${
			title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, ' ')
		} | Items | PokéInfo`;
	}, [title]);

	console.log(item);

	return (
		<MainBig>
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					<CardTitle>{item?.name?.replace(/-/g, ' ')}</CardTitle>
					<Subtitle>{item?.category?.name?.replace(/-/g, ' ')}</Subtitle>

					<ItemCardDataSection>
						<div>
							<ItemCardDataEffect>
								<h3>Effect</h3>
								{item?.effect_entries?.map(
									(ie) =>
										ie?.language?.name === 'en' && <p>{ie?.short_effect}</p>
								)}
							</ItemCardDataEffect>
							{item?.cost !== 0 && (
								<ItemCardDataCost>
									Cost : {item?.cost} Pokédollars
								</ItemCardDataCost>
							)}
							{item?.held_by_pokemon?.length !== 0 && (
								<ItemCardDataHeld>
									Held by :
									{item?.held_by_pokemon?.map((ih) => (
										<Link
											to={`/pokemon/${ih?.pokemon?.name}`}
											key={ih?.pokemon?.name}
										>
											{ih?.pokemon?.name.replace(/-/g, ' ')}
										</Link>
									))}
								</ItemCardDataHeld>
							)}
							<ItemCardDataFling>
								When the pokémon holds{' '}
								<Span>{item?.name?.replace(/-/g, ' ')}</Span> the move{' '}
								<i>Fling</i> has {item?.fling_power} power.
								{item?.fling_effect?.name !== undefined &&
									item?.fling_effect?.name !== 'berry-effect' &&
									item?.fling_effect?.name !== 'herb-effect' &&
									` The move will ${item?.fling_effect?.name?.replace(
										/-/g,
										' '
									)} the target.`}
							</ItemCardDataFling>
						</div>
						<div>
							<img
								src={item?.sprites?.default}
								alt={item?.name}
								width={96}
								height={96}
							/>
						</div>
					</ItemCardDataSection>

					<ItemCardDescSection>
						<ItemCardDescTitle>Game descriptions</ItemCardDescTitle>
						<ItemCardDescTable>
							<tbody>
								{item?.flavor_text_entries?.map((ift) =>
									ift?.language?.name === 'en' ? (
										<tr>
											<th>{ift?.version_group?.name?.replace(/-/g, ' ')}</th>
											<td>{ift?.text}</td>
										</tr>
									) : (
										''
									)
								)}
							</tbody>
						</ItemCardDescTable>
					</ItemCardDescSection>

					<BackButton onClick={() => navigate('/items')}>
						{' '}
						ᐸ Back to items
					</BackButton>
				</>
			)}
		</MainBig>
	);
};

export default ItemCard;