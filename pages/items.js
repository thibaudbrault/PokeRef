import React, { useState, useEffect } from 'react';

import { MainBig } from '/components/BaseStyles/Sizing';
import { LeftTitle } from '/components/BaseStyles/Headings';
import { Input, ModifiedSearch } from '/components/BaseStyles/Inputs';
import { Table, THead, TLink, TRow } from '/components/BaseStyles/Table';
import { TCategoryItems, TEffectItems, TNameItems } from '/components/Items/StyledItems';
import { useItems } from '/helpers/DataFetch';
import Loader from '/components/Loader/Loader';
import Head from 'next/head';
import Image from 'next/image';

function Items() {

	const [search, setSearch] = useState('');
	const [filteredItems, setFilteredItems] = useState([]);

	const { isLoading, error, data: items } = useItems();

	// Filter the items returned when the user type the name in the search bar
	useEffect(() => {
		setFilteredItems(
			items
				?.filter((items) =>
					items.name
						.replace(/-/g, ' ')
						.toLowerCase()
						.includes(search.toLowerCase())
				)
				?.sort((a, b) => a.name.localeCompare(b.name))
		);
	}, [search, items]);

	function itemsToHide(i) {
		return (
			i?.category?.name !== 'dynamax-crystals' &&
			i?.category?.name !== 'all-machines' &&
			i?.category?.name !== 'all-mail' &&
			i?.category?.name !== 'unused' &&
			i?.category?.name !== 'data-cards' &&
			i?.category?.name !== 'plot-advancement' &&
			i?.category?.name !== 'species-candies' &&
			i?.category?.name !== 'gameplay'
		);
	}

	if (error) {
		return <p>{error}</p>;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Head>
				<title>Items | Pokeref</title>
				<meta name="description" content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game" />
				<meta property="og:title" content="Items | Pokeref" />
				<meta property="og:description" content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game" />
				<meta property="og:url" content="https://pokeref.app/items" />
				<meta property="og:type" content="website" />
			</Head>
			<MainBig>
				<LeftTitle>Items</LeftTitle>
				<ModifiedSearch>
					<Input>
						<label htmlFor='searchBar'>Search</label>
						<input
							type='text'
							placeholder='Move Name'
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
						<tr>
							<th>Name</th>
							<th>Category</th>
							<th>Effect</th>
						</tr>
					</THead>
					<tbody>
						{filteredItems?.map(
							(i) =>
								itemsToHide(i) && (
									<TRow key={i.name}>
										<TNameItems>
											<div>
												{i.sprites.default !== null && 
													<Image src={i.sprites.default} alt='' width={30} height={30} />
												}
												<TLink to={`/items/${i.name}`} key={i.name}>
													<span>{i.name.replace(/-/g, ' ')}</span>
												</TLink>
											</div>
										</TNameItems>
										<TCategoryItems>
											{i.category.name.replace(/-/g, ' ')}
										</TCategoryItems>
										<TEffectItems>
											{i.effect_entries.map((ie) => (
												<span key={ie.short_effect}>{ie.short_effect}</span>
											))}
										</TEffectItems>
									</TRow>
								)
						)}
					</tbody>
				</Table>
			</MainBig>
		</>
	);
}

export default Items;
