import React, { useState, useEffect } from 'react';

import { MainBig } from '/components/BaseStyles/Sizing';
import {
	LocationList,
	LocationNav,
	LocationSection,
} from '/components/Locations/StyledLocations';
import Loader from '/components/Loader/Loader';
import { useLocations } from '/helpers/DataFetch';
import { regions } from '/helpers/DataMap';
import Head from 'next/head';
import Link from 'next/link';

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

	if (error) {
		return <p>{error}</p>;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Head>
				<title>Locations | Pokeref</title>
				<meta
					name='description'
					content='Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game'
				/>
				<meta property='og:title' content='Locations | Pokeref' />
				<meta
					property='og:description'
					content='Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game'
				/>
				<meta property='og:url' content='https://pokeref.app/locations' />
				<meta property='og:type' content='website' />
			</Head>
			<MainBig>
				<LocationNav>
					{Object.keys(regions).map((r, i) => (
						<button
							className={toggleState === i ? 'button_active' : ''}
							onClick={() => toggleTable(i)}
							key={regions[r]}
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
											<li key={l.locations}>
												<Link
													href={{
														pathname: '/location/[name]',
														query: { name: ll.name },
													}}
													key={ll.name}
												>
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
		</>
	);
}

export default Locations;
