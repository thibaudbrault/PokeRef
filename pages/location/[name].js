import React, { useEffect, useState } from 'react';

import { BackButton } from '/components/BaseStyles/Inputs';
import { MainBig, Section } from '/components/BaseStyles/Sizing';
import { FaChevronLeft } from 'react-icons/fa';
import Loader from '/components/Loader/Loader';
import { useArea, useLocation } from '/helpers/DataFetch';
import { CardTitle, Subtitle } from '/components/BaseStyles/Headings';
import {
	LocationNavContainer,
	LocationNav,
	LocationTable,
} from '/components/Locations/StyledLocations.js';
import Nav from '/components/Locations/LocationCard/Nav/Nav.LocationCard';
import {
	TableContainer,
	THead,
	TName,
	TRow,
} from '/components/BaseStyles/Table';
import { useRouter } from 'next/router';
import Link from 'next/link';

function LocationCard() {
	const router = useRouter();
	const { name } = router.query;

	const [game, setGame] = useState('red');
	const [toggleState, setToggleState] = useState(0);
	const {
		isLoading,
		error,
		data: location,
	} = useLocation(`https://pokeapi.co/api/v2/location/${name}`);

	const toggleTable = (index) => {
		setToggleState(index);
	};

	let areaUrl = location?.areas[toggleState]?.url;

	const { data: area } = useArea(areaUrl);

	useEffect(() => {
		if (location?.region?.name === 'kanto') {
			setGame('yellow');
		} else if (location?.region?.name === 'johto') {
			setGame('crystal');
		} else if (location?.region?.name === 'johto') {
			setGame('crystal');
		} else if (location?.region?.name === 'hoenn') {
			setGame('emerald');
		} else if (location?.region?.name === 'sinnoh') {
			setGame('platinum');
		} else if (location?.region?.name === 'unova') {
			setGame('black-2');
		} else if (location?.region?.name === 'kalos') {
			setGame('x');
		} else if (location?.region?.name === 'alola') {
			setGame('ultra-sun');
		}
	}, [location?.region?.name]);

	const title = `${name}`;

	useEffect(() => {
		document.title = `${
			title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, ' ')
		} | Locations | PokéRef`;
	}, [title]);

	if (error) {
		return <p>{error}</p>;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<MainBig>
			<CardTitle>
				{location.name
					.replace(/-/g, ' ')
					.replace(/kanto|johto|hoenn|sinnoh|unova|kalos|alola/, '')}
			</CardTitle>
			<Subtitle>
				{location?.region?.name} - {game.replace(/-/g, ' ')}
			</Subtitle>
			<LocationNavContainer>
				<LocationNav>
					{location.areas.map((la, i) => (
						<button
							className={toggleState === i ? 'button_active' : ''}
							onClick={() => toggleTable(i)}
							key={la.name}
						>
							<p>
								{la.name
									.replace(/-/g, ' ')
									.replace(/kanto|johto|hoenn|sinnoh|unova|kalos|alola/, '')
									.replace(/area/, '')}
							</p>
						</button>
					))}
				</LocationNav>
				<span>No information and / or not present in this game</span>
			</LocationNavContainer>
			<Nav setGame={setGame} />
			<Section>
				<TableContainer>
					<LocationTable>
						<THead>
							<tr>
								<th>Pokemon</th>
								<th>Location</th>
								<th>Probability</th>
								<th>Level</th>
								<th>Condition</th>
							</tr>
						</THead>
						<tbody>
							{area?.pokemon_encounters?.map((a) =>
								a.version_details.map(
									(av) =>
										av.version.name === game &&
										av.encounter_details.map((ave) => (
											<TRow key={a.pokemon.name}>
												<TName>{a.pokemon.name}</TName>
												<td>{ave.method.name.replace(/-/g, ' ')}</td>
												<td>{ave.chance} %</td>
												<td>
													{ave.max_level === ave.min_level 
													? (<span>{ave.max_level}</span>)
													: (<span>{ave.min_level} - {ave.max_level}</span>)
													}
												</td>
												{ave.condition_values.length !== 0 ? (
													<td>
														{ave.condition_values.map((avec) => (
															<p key={avec.name}>
																{avec.name.replace(/-/g, ' ')}
															</p>
														))}
													</td>
												) : (
													<td>-</td>
												)}
											</TRow>
										))
								)
							)}
						</tbody>
					</LocationTable>
				</TableContainer>
			</Section>
			<Link href='/locations' passHref>
				<BackButton>
					<FaChevronLeft /> Back to Locations
				</BackButton>
			</Link>
		</MainBig>
	);
}

export default LocationCard;
