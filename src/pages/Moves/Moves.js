import React, { useState, useEffect } from 'react';

import { MainBig } from '../../components/BaseStyles/Sizing';
import { MethodNav } from '../../components/BaseStyles/Navbars';
import { useMoves, useStatus } from '../../helpers/DataFetch';
import MovesTable from './Components/MovesTable.Moves';
import StatusTable from './Components/StatusTable.Moves';
import { LoadingImg } from '../../components/BaseStyles/Loader';

function Moves() {
	const { moves, loading } = useMoves(
		'https://pokeapi.co/api/v2/move?limit=826'
	);

	const { status } = useStatus(
		'https://pokeapi.co/api/v2/move-ailment?limit=22'
	);

	// Switch between the 'moves' table and the 'status' table
	// Default is the 'moves' table (1)
	const [toggleState, setToggleState] = useState(1);
	const toggleTable = (index) => {
		setToggleState(index);
	};

	useEffect(() => {
		document.title = `Moves | PokéRef`;
	}, []);

	return (
		<MainBig>
			{loading ? (
				<LoadingImg>
					<img
						src='https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'
						alt=''
						width={48}
						height={48}
					/>
				</LoadingImg>
			) : (
				<>
					<MethodNav>
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
				</>
			)}
		</MainBig>
	);
}

export default Moves;
