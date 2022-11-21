import React from 'react';
import { H3 } from '/components/Common/Headings';
import { PokemonInfoTable } from '../StyledInfo.PokemonCard';
import Link from 'next/link';

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
						<td>{pokemon.id < 10000 ? <p>{species?.capture_rate}</p> : '⠀'}</td>
					</tr>
					<tr>
						<th>Base happiness</th>
						<td>
							{pokemon.id < 10000 ? <p>{species?.base_happiness}</p> : '⠀'}
						</td>
					</tr>
					<tr>
						<th>Base experience</th>
						<td>
							<p>{pokemon?.base_experience}</p>
						</td>
					</tr>
					<tr>
						<th>Growth rate</th>
						<td>
							{pokemon.id < 10000 ? (
								<p>{species?.growth_rate?.name.replace(/-/g, ' ')}</p>
							) : (
								'⠀'
							)}
						</td>
					</tr>
					<tr>
						<th>Held items</th>
						<td>
							{pokemon?.held_items?.length > 0
								? pokemon?.held_items?.map((ph) => (
									<Link
										href={{
											pathname: '/item/[name]',
											query: { name: ph.item.name },
										}}
										key={ph.item.name}
									>
										<span>{ph?.item?.name?.replace(/-/g, ' ')}</span>
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
