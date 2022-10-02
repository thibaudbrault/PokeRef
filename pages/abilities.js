import React, { useState, useEffect } from 'react';

import { LeftTitle } from '/components/BaseStyles/Headings';
import { Input, ModifiedSearch } from '/components/BaseStyles/Inputs';
import {
	THead,
	TName,
	TRow,
	TEffect,
	TLink,
	TableContainer,
	ModifiedTable,
} from '/components/BaseStyles/Table';
import { ModifiedMainBig } from '/components/BaseStyles/Sizing';
import { useAbilities } from '/helpers/DataFetch';
import Loader from '/components/Loader/Loader';

function Abilities() {
	const [search, setSearch] = useState('');
	const [filteredAbilities, setFilteredAbilities] = useState([]);
	const { isLoading, error, data: abilities } = useAbilities();

	// Filter the abilities returned when the user type the name in the search bar
	useEffect(() => {
		setFilteredAbilities(
			abilities?.filter((abilities) =>
				abilities?.name
					.replace(/-/g, ' ')
					.toLowerCase()
					.includes(search.toLowerCase())
			)
		);
	}, [search, abilities]);

	useEffect(() => {
		document.title = `Abilities | PokéRef`;
	}, []);

	if (error) {
		return <p>{error}</p>;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<ModifiedMainBig>
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
			<TableContainer>
				<ModifiedTable>
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
								<TRow key={a.name}>
									<TName>
										<TLink href={{ pathname: '/ability/[name]', query: { name: a.name }}}>
											{a.name.replace(/-/g, ' ')}
										</TLink>
									</TName>
									<TEffect>
										{a.flavor_text_entries.map(
											(af) =>
												af.language.name === 'en' && (
													<span>{af.flavor_text}</span>
												)
										)}
									</TEffect>
								</TRow>
							))}
					</tbody>
				</ModifiedTable>
			</TableContainer>
		</ModifiedMainBig>
	);
}

export default Abilities;
