import React, { useState, useEffect } from 'react';

import { LeftTitle } from '../../components/BaseStyles/Headings';
import { Input, ModifiedSearch } from '../../components/BaseStyles/Inputs';
import {
	Table,
	THead,
	TName,
	TRow,
	TEffect,
	TLink,
	TableContainer,
} from '../../components/BaseStyles/Table';
import { ModifiedMainBig } from '../../components/BaseStyles/Sizing';
import { useAbilities } from '../../helpers/DataFetch';
import { LoadingImg } from '../../components/BaseStyles/Loader';

function Abilities() {
	const [search, setSearch] = useState('');
	const [filteredAbilities, setFilteredAbilities] = useState([]);

	const { abilities, loading } = useAbilities(
		'https://pokeapi.co/api/v2/ability?limit=267'
	);

	// Filter the abilities returned when the user type the name in the search bar
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
		document.title = `Abilities | PokéRef`;
	}, []);

	return (
		<ModifiedMainBig>
			{loading ? (
				<LoadingImg>
					<img
						src='https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'
						alt=''
						width={48}
						height={48}
					/>
				</LoadingImg>
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
					<TableContainer>
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
					</TableContainer>
				</>
			)}
		</ModifiedMainBig>
	);
}

export default Abilities;
