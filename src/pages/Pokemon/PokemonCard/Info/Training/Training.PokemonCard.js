import React from 'react';
import { Link } from 'react-router-dom';
import { H3 } from '../../../../../components/BaseStyles/Headings';
import { PokemonInfoTable } from '../StyledInfo.PokemonCard';

function Training({ pokemon, species }) {
	return (
		<div>
			<H3>Training</H3>
			<PokemonInfoTable>
				<tbody>
					<tr>
						<th>EV yield</th>
						<td>
							{pokemon?.stats?.map(
								(ps) =>
									ps?.effort !== 0 && (
										<p>
											{ps?.effort} {ps?.stat?.name?.replace(/-/g, ' ')}
										</p>
									)
							)}
						</td>
					</tr>
					<tr>
						<th>Catch rate</th>
						<td>{species?.capture_rate}</td>
					</tr>
					<tr>
						<th>Base happiness</th>
						<td>{species?.base_happiness}</td>
					</tr>
					<tr>
						<th>Base experience</th>
						<td>{pokemon?.base_experience}</td>
					</tr>
					<tr>
						<th>Growth rate</th>
						<td>{species?.growth_rate?.name.replace(/-/g, ' ')}</td>
					</tr>
					<tr>
						<th>Held items</th>
						<td>
							{pokemon?.held_items?.length > 0
								? pokemon?.held_items?.map((ph) => (
										<Link to={`/items/${ph.item.name}`}>
											{ph?.item?.name?.replace(/-/g, ' ')}
										</Link>
								  ))
								: 'None'}
						</td>
					</tr>
				</tbody>
			</PokemonInfoTable>
		</div>
	);
}

export default Training;
