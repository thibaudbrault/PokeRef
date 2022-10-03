import React, { useState, useEffect } from 'react';

import { MainBig } from '/components/BaseStyles/Sizing';
import { MethodNav } from '/components/BaseStyles/Navbars';
import { useMoves, useStatus } from '/helpers/DataFetch';
import MovesTable from '/components/Moves/Components/MovesTable.Moves';
import StatusTable from '/components/Moves/Components/StatusTable.Moves';
import Loader from '/components/Loader/Loader';
import Head from 'next/head';

function Moves() {
	const { isLoading, error, data: moves } = useMoves();
	const { data: status } = useStatus();

	// Switch between the 'moves' table and the 'status' table
	// Default is the 'moves' table (1)
	const [toggleState, setToggleState] = useState(1);
	const toggleTable = (index) => {
		setToggleState(index);
	};

	if (error) {
		return <p>{error}</p>;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Head>
				<title>Moves | Pokeref</title>
				<meta
					name='description'
					content='Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game'
				/>
				<meta property='og:title' content='Moves | Pokeref' />
				<meta
					property='og:description'
					content='Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game'
				/>
				<meta property='og:url' content='https://pokeref.app/moves' />
				<meta property='og:type' content='website' />
			</Head>
			<MainBig>
				<MethodNav id='head'>
					<button
						className={toggleState === 1 ? 'button_active' : ''}
						onClick={() => toggleTable(1)}
					>
						<p>Moves</p>
					</button>
					<button
						className={toggleState === 2 ? 'button_active' : ''}
						onClick={() => toggleTable(2)}
					>
						<p>Status</p>
					</button>
				</MethodNav>

				<MovesTable moves={moves} toggleState={toggleState} />

				<StatusTable status={status} toggleState={toggleState} />
			</MainBig>
		</>
	);
}

export default Moves;
