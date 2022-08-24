import React from 'react';
import { H3 } from '../../../../../components/BaseStyles/Headings';
import { PokemonInfoTable } from '../StyledInfo.PokemonCard';

function Breeding({ species, evolution }) {

	// Returns the gender rate for male and female in percent
	const female = (species?.gender_rate / 8) * 100;
	const male = '100' - (species?.gender_rate / 8) * 100;

	return (
		<div>
			<H3>Breeding</H3>
			<PokemonInfoTable>
				<tbody>
					<tr>
						<th>Gender</th>
						<td>
							{species?.gender_rate !== -1 ? (
								<>
									{male}% male
									<br />
									{female}% female
								</>
							) : (
								<>genderless</>
							)}
						</td>
					</tr>
					<tr>
						<th>Egg groups</th>
						<td>
							{species?.egg_groups?.map((seg) => (
								<p>{seg?.name}</p>
							))}
						</td>
					</tr>
					<tr>
						<th>Egg cycles</th>
						<td>{species?.hatch_counter} cycles</td>
					</tr>
					<tr>
						<th>Baby trigger item</th>
						<td>
							{evolution?.baby_trigger_item !== null
								? evolution?.baby_trigger_item?.name.replace(/-/g, ' ')
								: 'None'}
						</td>
					</tr>
					<tr>
						<th>Habitat</th>
						<td>
							{species?.habitat !== null
								? species?.habitat?.name
								: 'Undiscovered'}
						</td>
					</tr>
				</tbody>
			</PokemonInfoTable>
		</div>
	);
}

export default Breeding;
