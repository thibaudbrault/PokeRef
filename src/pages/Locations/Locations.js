import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import { MainBig } from '../../components/BaseStyles/Sizing';
import { LocationList, LocationNav, LocationSection } from './StyledLocations';

function Locations() {
	const [locations, setLocations] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get('https://pokeapi.co/api/v2/region?limit=7')
			.then((res) => {
				return res.data.results;
			})
			.then((results) => {
				return Promise.all(results.map((res) => axios.get(res.url)));
			})
			.then((results) => {
				setLoading(false);
				setLocations(results.map((res) => res.data));
			});
	}, []);

	const [toggleState, setToggleState] = useState(1);
	const toggleTable = (index) => {
		setToggleState(index);
	};

	const [location, setLocation] = useState();

	useEffect(() => {
		if (toggleState === 1) {
			setLocation('kanto');
		} else if (toggleState === 2) {
			setLocation('johto');
		} else if (toggleState === 3) {
			setLocation('hoenn');
		} else if (toggleState === 4) {
			setLocation('sinnoh');
		} else if (toggleState === 5) {
			setLocation('unova');
		} else if (toggleState === 6) {
			setLocation('kalos');
		} else if (toggleState === 7) {
			setLocation('alola');
		} else if (toggleState === 8) {
			setLocation('galar');
		}
	}, [toggleState]);

	useEffect(() => {
		document.title = `Locations | PokéInfo`;
	}, []);

	return (
		<MainBig>
			{loading ? (
				<BarWave width='40px' height='20px' color='#cc0000' />
			) : (
				<>
					<LocationNav>
						<button
							className={toggleState === 1 ? 'button_active' : ''}
							onClick={() => toggleTable(1)}
						>
							<p>Kanto</p>
						</button>

						<button
							className={toggleState === 2 ? 'button_active' : ''}
							onClick={() => toggleTable(2)}
						>
							<p>Johto</p>
						</button>

						<button
							className={toggleState === 3 ? 'button_active' : ''}
							onClick={() => toggleTable(3)}
						>
							<p>Hoenn</p>
						</button>

						<button
							className={toggleState === 4 ? 'button_active' : ''}
							onClick={() => toggleTable(4)}
						>
							<p>Sinnoh</p>
						</button>

						<button
							className={toggleState === 5 ? 'button_active' : ''}
							onClick={() => toggleTable(5)}
						>
							<p>Unova</p>
						</button>

						<button
							className={toggleState === 6 ? 'button_active' : ''}
							onClick={() => toggleTable(6)}
						>
							<p>Kalos</p>
						</button>

						<button
							className={toggleState === 7 ? 'button_active' : ''}
							onClick={() => toggleTable(7)}
						>
							<p>Alola</p>
						</button>

						<button
							className={toggleState === 8 ? 'button_active' : ''}
							onClick={() => toggleTable(8)}
						>
							<p>Galar</p>
						</button>
					</LocationNav>

					<LocationSection>
						{locations?.map(
							(l) =>
								l?.name === location &&
								location !== 'galar' && (
									<LocationList>
										{l?.locations
											?.sort((a, b) => a.name.localeCompare(b.name))
											?.map((ll) => (
												<li>
													<Link to={`/locations`}>
														{ll?.name
															?.replace(/-/g, ' ')
															.replace(
																/kanto|johto|hoenn|sinnoh|unova|kalos|alola/g,
																''
															)}
													</Link>
												</li>
											))}
									</LocationList>
								)
						)}
					</LocationSection>

					<LocationSection>
						{location === 'galar' && <p>No data for Galar</p>}
					</LocationSection>
				</>
			)}
		</MainBig>
	);
}

export default Locations;
