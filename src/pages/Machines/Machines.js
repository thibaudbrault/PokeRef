import React, { useState, useEffect } from 'react';

import { GenNav } from '../../components/BaseStyles/Navbars';
import { Input, ModifiedSearch } from '../../components/BaseStyles/Inputs';
import { LeftTitle } from '../../components/BaseStyles/Headings';
import {
	Table,
	THead,
	TLink,
	TName,
	TRow,
} from '../../components/BaseStyles/Table';
import { MainBig } from '../../components/BaseStyles/Sizing';
import { useMachines } from '../../helpers/DataFetch';

function Machines() {
	const [search, setSearch] = useState('');
	const [filteredMachines, setFilteredMachines] = useState([]);

	const { machines, loading } = useMachines(
		'https://pokeapi.co/api/v2/machine?limit=1700'
	);

	useEffect(() => {
		setFilteredMachines(
			machines.filter((machines) =>
				machines.move.name
					.replace(/-/g, ' ')
					.toLowerCase()
					.includes(search.toLowerCase())
			)
		);
	}, [machines, search]);

	const [version, setVersion] = useState('red-blue');

	useEffect(() => {
		document.title = `Machines | PokéInfo`;
	}, []);

	return (
		<MainBig>
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					<LeftTitle>Machines</LeftTitle>
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
									<button onClick={() => setVersion('platinum')}>
										Platinum
									</button>
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
									<button
										onClick={() => setVersion('omega-ruby-alpha-sapphire')}
									>
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

					<Table>
						<THead>
							<tr>
								<th>Name</th>
								<th>Moves</th>
							</tr>
						</THead>
						<tbody>
							{filteredMachines.map(
								(ma) =>
									ma?.version_group?.name === version && (
										<TRow>
											<TName>{ma?.item?.name.toUpperCase()}</TName>
											<td>
												<TLink
													to={`/moves/${ma?.move?.name}`}
													key={ma?.move?.name}
												>
													{ma?.move?.name.replace(/-/g, ' ')}
												</TLink>
											</td>
										</TRow>
									)
							)}
						</tbody>
					</Table>
				</>
			)}
		</MainBig>
	);
}

export default Machines;
