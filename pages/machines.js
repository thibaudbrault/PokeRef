/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';

import { GenNav } from '/components/BaseStyles/Navbars';
import { Input } from '/components/BaseStyles/Inputs';
import { LeftTitle } from '/components/BaseStyles/Headings';
import { THead, TLink, TName, TRow } from '/components/BaseStyles/Table';
import { MainBig } from '/components/BaseStyles/Sizing';
import { useMachines } from '/helpers/DataFetch';
import {
	MachinesSearch,
	MachinesTable,
} from '/components/Machines/StyledMachines';
import Loader from '/components/Loader/Loader';
import Head from 'next/head';
import Link from 'next/link';

function Machines() {
	const [search, setSearch] = useState('');
	const [filteredMachines, setFilteredMachines] = useState([]);

	const { isLoading, error, data: machines } = useMachines();

	// Filter the moves returned when the user type the name in the search bar
	useEffect(() => {
		setFilteredMachines(
			machines?.filter((machines) =>
				machines.move.name
					.replace(/-/g, ' ')
					.toLowerCase()
					.includes(search.toLowerCase())
			)
		);
	}, [machines, search]);

	// Set default version for the list of returned machines to 'red-blue'
	const [version, setVersion] = useState('red-blue');

	if (error) {
		return <p>{error}</p>;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Head>
				<title>Machines | Pokeref</title>
				<meta
					name='description'
					content='Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game'
				/>
				<meta property='og:title' content='Machines | Pokeref' />
				<meta
					property='og:description'
					content='Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game'
				/>
				<meta property='og:url' content='https://pokeref.app/machines' />
				<meta property='og:type' content='website' />
			</Head>
			<MainBig>
				<LeftTitle>Machines</LeftTitle>
				<MachinesSearch>
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
				</MachinesSearch>

				<GenNav>
					<ol>
						<li>
							<button>Gen I</button>
							<div>
								<button onClick={() => setVersion('red-blue')}>
									Red / Blue
								</button>
								<button onClick={() => setVersion('yellow')}>Yellow</button>
							</div>
						</li>
						<li>
							<button>Gen II</button>
							<div>
								<button onClick={() => setVersion('gold-silver')}>
									Gold / Silver
								</button>
								<button onClick={() => setVersion('crystal')}>Crystal</button>
							</div>
						</li>
						<li>
							<button>Gen III</button>
							<div>
								<button onClick={() => setVersion('ruby-sapphire')}>
									Ruby / Sapphire
								</button>
								<button onClick={() => setVersion('emerald')}>Emerald</button>
								<button onClick={() => setVersion('firered-leafgreen')}>
									FireRed / GreenLeaf
								</button>
							</div>
						</li>
						<li>
							<button>Gen IV</button>
							<div>
								<button onClick={() => setVersion('diamond-pearl')}>
									Diamond / Pearl
								</button>
								<button onClick={() => setVersion('platinum')}>Platinum</button>
								<button onClick={() => setVersion('heartgold-soulsilver')}>
									HeartGold / SoulSilver
								</button>
							</div>
						</li>
						<li>
							<button>Gen V</button>
							<div>
								<button onClick={() => setVersion('black-white')}>
									Black / White
								</button>
								<button onClick={() => setVersion('black-2-white-2')}>
									Black 2 / White 2
								</button>
							</div>
						</li>
						<li>
							<button>Gen VI</button>
							<div>
								<button onClick={() => setVersion('x-y')}>X / Y</button>
								<button onClick={() => setVersion('omega-ruby-alpha-sapphire')}>
									Omega Ruby Alpha / Sapphire
								</button>
							</div>
						</li>
						<li>
							<button>Gen VII</button>
							<div>
								<button onClick={() => setVersion('sun-moon')}>
									Sun / Moon
								</button>
								<button onClick={() => setVersion('ultra-sun-ultra-moon')}>
									Ultra Sun / Ultra Moon
								</button>
								<button
									onClick={() => setVersion('lets-go-pikachu-lets-go-eevee')}
								>
									Let's Go Pikachu / Let's Go Eevee
								</button>
							</div>
						</li>
						<li>
							<button>Gen VIII</button>
							<div>
								<button onClick={() => setVersion('sword-shield')}>
									Sword / Shield
								</button>
							</div>
						</li>
					</ol>
				</GenNav>

				<MachinesTable>
					<THead>
						<tr>
							<th>Name</th>
							<th>Moves</th>
						</tr>
					</THead>
					<tbody>
						{filteredMachines?.map(
							(ma) =>
								ma?.version_group?.name === version && (
									<TRow>
										<TName>{ma?.item?.name.toUpperCase()}</TName>
										<td>
											<Link
												href={{
													pathname: '/move/[name]',
													query: { name: ma.move.name },
												}}
												key={ma?.move?.name}
												passHref
											>
												<TLink>{ma?.move?.name.replace(/-/g, ' ')}</TLink>
											</Link>
										</td>
									</TRow>
								)
						)}
					</tbody>
				</MachinesTable>
			</MainBig>
		</>
	);
}

export default Machines;
