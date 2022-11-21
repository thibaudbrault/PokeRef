import React from 'react';
import { H3 } from '/components/Common/Headings';
import { MethodNav } from '/components/Common/Navbars';
import {
	PokemonTypesContainer,
	PokemonTypesTable,
} from '../StyledStats.PokemonCard';

function Types({ pokemon, types, toggleType, toggleTypeTable }) {
	return (
		<PokemonTypesContainer>
			<H3>Types relations</H3>
			<MethodNav>
				<button
					className={toggleType === 1 ? 'button_active' : ''}
					onClick={() => toggleTypeTable(1)}
				>
					<p>Attack</p>
				</button>
				<button
					className={toggleType === 2 ? 'button_active' : ''}
					onClick={() => toggleTypeTable(2)}
				>
					<p>Defense</p>
				</button>
			</MethodNav>
			<PokemonTypesTable visibility={toggleType === 1}>
				<tbody>
					<tr>
						<th>0x damage to</th>
						<td></td>
					</tr>
					<tr>
						<th>1/4x damage to</th>
						<td></td>
					</tr>
					<tr>
						<th>1/2x damage to</th>
						<td></td>
					</tr>
					<tr>
						<th>1x damage to</th>
						<td></td>
					</tr>
					<tr>
						<th>2x damage to</th>
						<td></td>
					</tr>
					<tr>
						<th>4x damage to</th>
						<td></td>
					</tr>
				</tbody>
			</PokemonTypesTable>
			<PokemonTypesTable visibility={toggleType === 2}>
				<tbody>
					<tr>
						<th>0x damage from</th>
						<td></td>
					</tr>
					<tr>
						<th>1/4x damage from</th>
						<td></td>
					</tr>
					<tr>
						<th>1/2x damage from</th>
						<td></td>
					</tr>
					<tr>
						<th>1x damage from</th>
						<td></td>
					</tr>
					<tr>
						<th>2x damage from</th>
						<td></td>
					</tr>
					<tr>
						<th>4x damage from</th>
						<td></td>
					</tr>
				</tbody>
			</PokemonTypesTable>
		</PokemonTypesContainer>
	);
}

export default Types;
