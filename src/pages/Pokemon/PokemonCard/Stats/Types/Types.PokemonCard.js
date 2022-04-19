import React from 'react';
import { H3 } from '../../../../../components/BaseStyles/Headings';
import { PokemonTypesTable } from '../StyledStats.PokemonCard';

function Types({ pokemon, type, toggleType, toggleTypeTable }) {
	return (
		<div>
			<H3>Types relations</H3>
			<nav className='method'>
				<button
					className={toggleType === 1 ? 'method_active' : 'method_element'}
					onClick={() => toggleTypeTable(1)}
				>
					<p>Attack</p>
				</button>
				<button
					className={toggleType === 2 ? 'method_active' : 'method_element'}
					onClick={() => toggleTypeTable(2)}
				>
					<p>Defense</p>
				</button>
			</nav>
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
		</div>
	);
}

export default Types;
