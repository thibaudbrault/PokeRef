import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

function Abilities() {
	const [search, setSearch] = useState('');
	const [filteredAbilities, setFilteredAbilities] = useState([]);

	const [abilities, setAbilities] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get('https://pokeapi.co/api/v2/ability?limit=267')
			.then((res) => {
				return res.data.results;
			})
			.then((results) => {
				return Promise.all(results.map((res) => axios.get(res.url)));
			})
			.then((results) => {
				setLoading(false);
				setAbilities(results.map((res) => res.data));
			});
	}, []);

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
