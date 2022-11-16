import React, { useState, useEffect } from 'react';

import { LeftTitle } from '../components/BaseStyles/Headings';
import { Input, ModifiedSearch } from '../components/BaseStyles/Inputs';
import {
	THead,
	TName,
	TRow,
	TEffect,
	TLink,
	TableContainer,
	ModifiedTable,
} from '../components/BaseStyles/Table';
import { ModifiedMainBig } from '../components/BaseStyles/Sizing';
import { useAbilities } from '../helpers/DataFetch';
import Loader from '../components/Loader/Loader';
import Head from 'next/head';
import Link from 'next/link';

function Abilities() {
	const [search, setSearch] = useState<string>('');
	const [filteredAbilities, setFilteredAbilities] = useState<any>([]);
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

	console.log(filteredAbilities)

	if (error) {
		return <p>{error}</p>;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Head>
				<title>Abilities | Pokeref</title>
				<meta
					name='description'
					content='Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game'
				/>
				<meta property='og:title' content='Abilities | Pokeref' />
				<meta
					property='og:description'
					content='Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game'
				/>
				<meta property='og:url' content='https://pokeref.app/abilities' />
				<meta property='og:type' content='website' />
			</Head>
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
								?.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name))
								.map((a: { name: string; flavor_text_entries: { language: { name: string; }; flavor_text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal; }[]; }) => (
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
												(af: { language: { name: string; }; flavor_text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal; }) =>
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
