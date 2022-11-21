import React, { useState, useEffect } from 'react';

import { LeftTitle } from '../../components/Common/Headings';
import { Input, ModifiedSearch } from '../../components/Common/Inputs';
import {
	THead,
	TName,
	TRow,
	TEffect,
	TLink,
	TableContainer,
	ModifiedTable,
} from '../../components/Common/Table';
import { ModifiedMainBig } from '../../components/Common/Sizing';
import { useAbilities } from '../../helpers/DataFetch';
import Loader from '../../components/Loader/Loader';
import Link from 'next/link';
import { Sort } from '@/types/types';

function Abilities() {
	const [search, setSearch] = useState<string | null>(null);
	const [filteredAbilities, setFilteredAbilities] = useState<any>([]);
	const { isLoading, error, data: abilities } = useAbilities();

	// Filter the abilities returned when the user type the name in the search bar
	const filterAbilities = search ? abilities?.filter((abilities) => abilities.name
		.replace(/-/g, ' ')
		.toLowerCase()
		.includes(search?.toLowerCase())
	) : abilities;

	// New request when the user types a letter
	useEffect(() => setFilteredAbilities(
		filterAbilities
	), [search]);

	console.log(filteredAbilities)

	if (error instanceof Error) {
		return { error };
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
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
								?.sort(({ a, b }: Sort) => a.name.localeCompare(b.name))
								.map((a) => (
									<TRow key={a.name}>
										<TName>
											<Link
												href={{
													pathname: '/ability/[name]',
													query: { name: a.name },
												}}
												passHref
											>
												<TLink>{a.name.replace(/-/g, ' ')}</TLink>
											</Link>
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
		</>
	);
}

export default Abilities;
