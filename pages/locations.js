import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MainBig } from '../../components/BaseStyles/Sizing';
import { LocationList, LocationNav, LocationSection } from './StyledLocations';
import Loader from '../../components/Loader/Loader';
import { useLocations } from '../../helpers/DataFetch';
import { regions } from '../../helpers/DataMap';

function Locations() {
	const [location, setLocation] = useState();
	const [toggleState, setToggleState] = useState(0);
	const { isLoading, error, data: locations } = useLocations();

	const toggleTable = (index) => {
		setToggleState(index);
	};

	useEffect(() => {
		setLocation(regions[toggleState + 1]);
	}, [toggleState]);

	useEffect(() => {
		document.title = `Locations | PokéRef`;
	}, []);

	if (error) {
		return <p>{error}</p>;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<MainBig>
			<LocationNav>
				{Object.keys(regions).map((r, i) => (
					<button
						className={toggleState === i ? 'button_active' : ''}
						onClick={() => toggleTable(i)}
					>
						<p>{regions[r]}</p>
					</button>
				))}
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
											<Link to={`/locations/${ll.name}`} key={ll.name}>
												{ll?.name
													?.replace(/-/g, ' ')
													?.replace(
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

			{location === 'galar' ? (
				<LocationSection>
					<p>No data for Galar</p>
				</LocationSection>
			) : null}
		</MainBig>
	);
}

export default Locations;
