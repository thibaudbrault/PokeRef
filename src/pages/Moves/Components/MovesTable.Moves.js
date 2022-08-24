import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { LeftTitle } from '../../../components/BaseStyles/Headings';
import { Input, ModifiedSearch } from '../../../components/BaseStyles/Inputs';
import {
	Table,
	TableContainer,
	TEffect,
	THead,
	TLink,
	TName,
	TRow,
} from '../../../components/BaseStyles/Table';
import { Type } from '../../../components/BaseStyles/Themes';
import { MovesSection, TCategory, TType } from '../StyledMoves';

function MovesTable({ moves, toggleState }) {
	const [search, setSearch] = useState('');
	const [filteredMoves, setFilteredMoves] = useState([]);

	// Filter the moves returned when the user type the name in the search bar
	useEffect(() => {
		setFilteredMoves(
			moves.filter((moves) =>
				moves.name
					.replace(/-/g, ' ')
					.toLowerCase()
					.includes(search.toLowerCase())
			)
		);
	}, [search, moves]);

	return (
		<MovesSection visibility={toggleState === 1}>
			<LeftTitle>Moves</LeftTitle>
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
			<TableContainer>
				<Table>
					<THead>
						<tr>
							<th>Name</th>
							<th>Category</th>
							<th>Type</th>
							<th>Effect</th>
						</tr>
					</THead>
					<tbody>
						{filteredMoves
							?.sort((a, b) => a.name.localeCompare(b.name))
							?.map((m) => (
								<TRow>
									<TName>
										<TLink to={`/moves/${m.name}`} key={m.name}>
											{m?.name?.replace(/-/g, ' ')}
										</TLink>
									</TName>
									<TCategory id={m?.damage_class?.name}>
										<div>
											<img alt={m.damage_class.name} />
											<span>{m?.damage_class?.name}</span>
										</div>
									</TCategory>
									<TType>
										<Type id={m.type.name}>
											<Link to={`/types/${m.type.name}`}>
												<img alt={m.type.name} />
												<span>{m?.type?.name}</span>
											</Link>
										</Type>
									</TType>
									<TEffect>
										{m?.flavor_text_entries?.map(
											(mf) =>
												mf.language.name === 'en' &&
												mf.flavor_text !== 'Dummy Data' && (
													<span>{mf?.flavor_text}</span>
												)
										)}
									</TEffect>
								</TRow>
							))}
					</tbody>
				</Table>
			</TableContainer>
		</MovesSection>
	);
}

export default MovesTable;
