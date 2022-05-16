import React from 'react';
import { TLink } from '../../../../../components/BaseStyles/Table';
import { PokemonDataTable } from '../StyledData.PokemonCard';

function Base({ pokemon, species, game, location }) {
	const height = (pokemon?.height * 0.1).toFixed(2);
	const weight = (pokemon?.weight * 0.1).toFixed(2);

	return (
		<PokemonDataTable>
			<tbody>
				<tr>
					<th>National number</th>
					<td>
						{pokemon?.id > 10000
							? `# ${species?.id?.toString()?.padStart(3, '0')}`
							: `# ${pokemon?.id?.toString()?.padStart(3, '0')}`}
					</td>
				</tr>
				<tr>
					<th>Locations</th>
					<td>
						{location.length !== 0
							? location?.map((l) =>
									l?.version_details?.map(
										(lv) =>
											lv?.version?.name === game && (
												<p>{l?.location_area?.name?.replace(/-/g, ' ')}</p>
											)
									)
							  )
							: 'Not found in the wild'}
					</td>
				</tr>
				<tr>
					<th>Abilities</th>
					<td>
						{pokemon?.abilities?.map((pa) => (
							<p>
								<TLink
									to={`/abilities/${pa.ability.name}`}
									key={pa.ability.name}
								>
									{pa?.ability?.name?.replace(/-/g, ' ')}
								</TLink>
								{pa?.is_hidden && <>‌‌ (hidden ability)</>}
							</p>
						))}
					</td>
				</tr>
				<tr>
					<th>Height</th>
					<td>{height.toString()} m</td>
				</tr>
				<tr>
					<th>Weight</th>
					<td>{weight.toString()} kg</td>
				</tr>
				<tr>
					<th>Category</th>
					<td>
						{species?.genera?.map(
							(sg) => sg?.language?.name === 'en' && <>{sg?.genus}</>
						)}
					</td>
				</tr>
				<tr>
					<th>Shape</th>
					<td>{species?.shape?.name}</td>
				</tr>
				<tr>
					<th>Color</th>
					<td>{species?.color?.name}</td>
				</tr>
			</tbody>
		</PokemonDataTable>
	);
}

export default Base;
