import React, { useState, useEffect } from 'react';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import { LeftTitle } from '../../components/BaseStyles/Headings';
import { Input, ModifiedSearch } from '../../components/BaseStyles/Inputs';
import {
	Table,
	THead,
	TName,
	TRow,
	TEffect,
	TLink,
} from '../../components/BaseStyles/Table';
import { ModifiedMainBig } from '../../components/BaseStyles/Sizing';
import { useAbilities } from '../../helpers/DataFetch';

function Abilities() {
	const [search, setSearch] = useState('');
	const [filteredAbilities, setFilteredAbilities] = useState([]);

	const { abilities, loading } = useAbilities('https://pokeapi.co/api/v2/ability?limit=267');

	useEffect(() => {
		setFilteredAbilities(
			abilities.filter((abilities) =>
				abilities.name
					.replace(/-/g, ' ')
					.toLowerCase()
					.includes(search.toLowerCase())
			)
		);
	}, [search, abilities]);

	useEffect(() => {
		document.title = `Abilities | PokéInfo`;
	}, []);

	return (
		<ModifiedMainBig>
			{loading ? (
				<BarWave width='40px' height='20px' color='#cc0000' />
			) : (
				<>
					<LeftTitle>Abilities</LeftTitle>
					<ModifiedSearch>
						<Input>
							<label htmlFor='searchBar'>Search</label>
							<input
								type='text'
								placeholder='Ability Name'
								name='searchBar'
								id='searchBar'
								onChange={(e) => {
									setSearch(e.target.value);
								}}
							/>
						</Input>
					</ModifiedSearch>
					<Table>
						<THead>
							<tr className='abilities_table_head_row'>
								<th className='abilities_table_head_row_element'>Name</th>
								<th className='abilities_table_head_row_element'>Effect</th>
							</tr>
						</THead>
						<tbody>
							{filteredAbilities
								?.sort((a, b) => a.name.localeCompare(b.name))
								.map((a) => (
									<TRow>
										<TName>
											<TLink to={`/abilities/${a.name}`} key={a.name}>
												{a.name.replace(/-/g, ' ')}
											</TLink>
										</TName>
										<TEffect>
											{a?.flavor_text_entries?.map(
												(af) =>
													af.language.name === 'en' && (
														<span>{af.flavor_text}</span>
													)
											)}
										</TEffect>
									</TRow>
								))}
						</tbody>
					</Table>
				</>
			)}
		</ModifiedMainBig>
	);
}

export default Abilities;