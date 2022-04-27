import React, { useState, useEffect } from 'react';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import { MainBig } from '../../components/BaseStyles/Sizing';
import { MethodNav } from '../../components/BaseStyles/Navbars';
import { useMoves, useStatus } from '../../helpers/DataFetch';
import MovesTable from './Components/MovesTable.Moves';
import StatusTable from './Components/StatusTable.Moves';

function Moves() {

	const { moves, loading } = useMoves('https://pokeapi.co/api/v2/move?limit=826');

	const { status } = useStatus('https://pokeapi.co/api/v2/move-ailment?limit=22');
	

	const [toggleState, setToggleState] = useState(1);
	const toggleTable = (index) => {
		setToggleState(index);
	};

	useEffect(() => {
		document.title = `Moves | PokéInfo`;
	}, []);

	return (
		<MainBig>
			{loading ? (
				<BarWave width='40px' height='20px' color='#cc0000' />
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

					<MovesTable 
						moves={moves}
						toggleState={toggleState}
					/>

					<StatusTable 
						status={status}
						toggleState={toggleState}
					/>

				</>
			)}
		</MainBig>
	);
}

export default Moves;
